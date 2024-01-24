"use client";
import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ReviewPageProps {
	params: {
		assignmentId: number;
	};
}

const ReviewPage: React.FC<ReviewPageProps> = ({
	params: { assignmentId },
}) => {
	// var biscotti = cookies();

	// const reviews = await fetch(
	// 	"http://0.0.0.0:8090/review/" + assignmentId
	// ).then((res) => res.json());

	// const test = await fetch("http://0.0.0.0:8090/test", {
	// 	headers: {
	// 		Authorization: "Bearer: " + biscotti.get("appSession")?.value,
	// 	},
	// });

	const [test, setTest] = useState<Response>();
	useEffect(() => {
		const fetchData = async () => {
			await fetch("/api/review/test").then((res) => setTest(res));
		};

		fetchData();
	}, []);
	// const test = await fetch("/api/review/test");

	return (
		<Text>
			{/* reviewId: {reviews[0].id}
			<br />
			{reviews[0].feedback}
			<br /> */}
			{test?.status}
		</Text>
	);
};

export default ReviewPage;
