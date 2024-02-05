import { App } from "octokit";

const app = new App({
	appId: process.env.GH_APP_ID || "78e02d6e36d0b5fd631522fdaee5ef5863615172",
	privateKey: process.env.GH_PRIVATE_KEY || "",
});

export const getOctokit = async (installationId: number) =>
	await app.getInstallationOctokit(installationId);
