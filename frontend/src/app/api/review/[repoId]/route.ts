import { NextRequest, NextResponse } from "next/server";
import { getRepoDetails } from "../../db-requests";
import { getOctokit } from "../../github/Github";
import { Comment } from "@/store/CommentStore";

export interface CreateCommentBody {
	comments: Comment[];
	commit_id: string;
	feedback: string;
}

export async function POST(req: NextRequest, context: any) {
	const { repoId } = context.params;

	const repoDetails = await getRepoDetails(repoId);

	const githubApi = await getOctokit(repoDetails.course.installationId);

	const owner = repoDetails.repoUrl.split("/")[3];
	const repo = repoDetails.repoUrl.split("/")[4];
	const pull_number = parseInt(repoDetails.repoUrl.split("/")[6]);

	const { comments, commit_id, feedback }: CreateCommentBody =
		await req.json();

	let resultStatuses = [];

	//post in-line comments
	comments.forEach(async ({ file, comment, changeKey }) => {
		let inlineCommentRes = await githubApi.request(
			"POST /repos/{owner}/{repo}/pulls/{pull_number}/comments",
			{
				repo,
				owner,
				pull_number: pull_number,
				body: comment,
				commit_id,
				path: file,
				// start_line: line,
				// start_side: "RIGHT",
				line: parseInt(changeKey.slice(1)),
				side: ["N", "D"].includes(changeKey[0]) ? "LEFT" : "RIGHT",
			}
		);

		resultStatuses.push(inlineCommentRes.status || 500);
	});

	//create normal comment in "issue"(pr) thread
	const normalComment = await githubApi.request(
		"POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
		{
			owner,
			repo,
			issue_number: pull_number,
			body: feedback,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		}
	);
	resultStatuses.push(normalComment.status || 500);

	if (resultStatuses.findIndex((el) => el < 200 || el >= 400) !== -1) {
		return NextResponse.json(
			{
				message: "An error occurred",
			},
			{
				status: 500,
			}
		);
	}

	//TODO persist reviewer in database

	return NextResponse.json({}, { status: 200 });
}

//Gets the diff of a pull request
export async function GET(req: NextRequest, context: any) {
	const { repoId } = context.params;

	const repoDetails = await getRepoDetails(repoId);

	const githubApi = await getOctokit(repoDetails.course.installationId);

	const owner = repoDetails.repoUrl.split("/")[3];
	const repo = repoDetails.repoUrl.split("/")[4];
	const pull_number = parseInt(repoDetails.repoUrl.split("/")[6]);

	//get repo info
	const prRes = await githubApi.request(
		"GET /repos/{owner}/{repo}/pulls/{pull_number}",
		{
			owner,
			repo,
			pull_number,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
				contentType: "application/vnd.github.full+json",
			},
			contentType: "application/vnd.github.full+json",
			//maybe check content type
		}
	);

	//get diff file content
	const diffRes = await fetch(prRes.data.diff_url);

	return NextResponse.json({
		diff: await diffRes.text(),
		commit: prRes.data.head.sha,
	});
}
