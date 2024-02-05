import { NextRequest } from "next/server";

export async function POST(req: NextRequest, context: any) {
	const { installationId } = context.params;
	const data: { name: String } = await req.json();

	const jsonBody = JSON.stringify({
		...data,
		id: 0,
		installationId,
	});

	const result = await fetch("http://0.0.0.0:8090/course", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: jsonBody,
		cache: "no-store",
	});
	return result;
}
