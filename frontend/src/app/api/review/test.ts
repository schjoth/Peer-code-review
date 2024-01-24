import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiHandler } from "next";

const handle: NextApiHandler = async (req, res) => {
	try {
		const { accessToken } = await getAccessToken(req, res);
		console.log(accessToken);
		const test = await fetch("http://0.0.0.0:8090/test", {
			headers: {
				Authorization: "Bearer: " + accessToken,
			},
		});
		return test;
	} catch (error) {
		res.status(500);
		return "";
	}
};

export default withApiAuthRequired(handle);
