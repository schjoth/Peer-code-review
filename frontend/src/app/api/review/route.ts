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
