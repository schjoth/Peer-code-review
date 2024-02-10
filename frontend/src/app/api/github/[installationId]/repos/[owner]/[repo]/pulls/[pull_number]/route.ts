import { NextRequest, NextResponse } from "next/server";
import { getOctokit } from "../../../../../../Github";
import { App } from "octokit";

export async function GET(req: NextRequest, context: any) {
	const { installationId, owner, repo, pull_number } = context.params;
	const githubApi = await getOctokit(installationId);

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
