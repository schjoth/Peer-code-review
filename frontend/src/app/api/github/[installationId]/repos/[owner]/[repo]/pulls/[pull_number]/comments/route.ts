import { getOctokit } from "../../../../../../../Github";
import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@/store/CommentStore";

const INSTALLATION_ID = 46537183; //TODO get programattically
//https://docs.github.com/en/rest/guides/scripting-with-the-rest-api-and-javascript?apiVersion=2022-11-28#prerequisites

//this is for testing purposes
export async function GET() {
	const githubApi = await getOctokit(INSTALLATION_ID);

	const res = await githubApi.request("GET /repos/{owner}/{repo}", {
		repo: "demo-repository",
		owner: "Testing-PCR",
	});
	console.log(res);
}

export interface CreateCommentBody {
	comments: Comment[];
	commit_id: string;
	feedback: string;
}

export async function POST(req: NextRequest, context: any) {
	const { installationId, owner, repo, pull_number } = context.params;

	const githubApi = await getOctokit(installationId);
	console.log(context.params);

	const { comments, commit_id, feedback }: CreateCommentBody =
		await req.json();

	let resultStatuses = [];

	//post in-line comments
	comments.forEach(async ({ file, comment, changeKey }) => {
		let inlineComment = await githubApi.request(
			"POST /repos/{owner}/{repo}/pulls/{pull_number}/comments",
			{
				repo,
				owner,
				pull_number: Number(pull_number),
				body: comment,
				commit_id,
				path: file,
				// start_line: line,
				// start_side: "RIGHT",
				line: parseInt(changeKey.slice(1)),
				side: changeKey[0] == "N" ? "LEFT" : "RIGHT",
			}
		);

		resultStatuses.push(inlineComment.status || 500);
	});

	//create normal comment in "issue"(pr) thread
	const normalComment = await githubApi.request(
		"POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
		{
			owner,
			repo,
			issue_number: 1,
			body: feedback,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		}
	);
	resultStatuses.push(normalComment.status || 500);

	if (resultStatuses.findIndex((el) => el === 201) !== -1) {
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
