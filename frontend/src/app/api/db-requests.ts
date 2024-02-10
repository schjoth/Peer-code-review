import { RepoDetails } from "./db-types";

export const getRepoDetails = async (id: number): Promise<RepoDetails> => {
	return await fetch("http://localhost:8090/repo/" + id, {
		method: "GET",
	}).then((res) => res.json() as Promise<RepoDetails>);
};
