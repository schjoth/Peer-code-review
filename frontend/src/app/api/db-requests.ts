import { RepoDetails } from "./db-types";

export const getRepoDetails = async (id: number): Promise<RepoDetails> => {
	return await fetch("http://localhost:8090/repo/" + id, {
		method: "GET",
	}).then((res) => res.json() as Promise<RepoDetails>);
};

export const persistUserIdentity = async (identity: string, repo: number) => {
	return await fetch("http://localhost:8090/reviewer", {
		method: "POST",
		body: JSON.stringify({ identity, repo }),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
};
