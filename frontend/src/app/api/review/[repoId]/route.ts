import { NextRequest, NextResponse } from "next/server";
import { getRepoDetails } from "../../db-requests";
import { getOctokit } from "../../github/Github";

export async function POST(req: Request) {
	const bodyContent = await req.json();
	const jsonBody = JSON.stringify(bodyContent);

	const result = await fetch("http://0.0.0.0:8090/review", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: jsonBody,
		cache: "no-store",
	});
	return result;
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
	});
}
