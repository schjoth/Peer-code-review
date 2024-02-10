"use client";
import {
	Box,
	Button,
	Flex,
	FormLabel,
	Spinner,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { useCommentStore } from "@/store/CommentStore";
import { useEffect, useState } from "react";
import DiffView from "@/components/DiffView";
import { CreateCommentBody } from "@/app/api/review/[repoId]/route";

export default function Home({
	params: { sourceId },
}: {
	params: { sourceId: string };
}) {
	const { comments, clear: clearStore } = useCommentStore();
	const [data, setData] = useState<{
		diff: string;
		commit: string;
	}>();

	useEffect(() => {
		const fetchData = async () => {
			await fetch("/api/review/" + sourceId)
				.then((res) => res.json())
				.then((data) => setData(data));
		};

		fetchData();
	}, []);

	const [feedback, setFeedback] = useState("");
	const [isComplete, setIsComplete] = useState<boolean>(false);

	const onSubmit = async () => {
		if (!data || !feedback) return;

		const body: CreateCommentBody = {
			comments: comments,
			commit_id: data?.commit,
			feedback: feedback,
		};

		await fetch("/api/review/" + sourceId, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
			cache: "no-store",
		}).then((res) => {
			if (res.ok) {
				clearStore();
				setFeedback("");
				setIsComplete(true);
			}
		});
	};

	if (isComplete) {
		return (
			<Flex
				h="100vh"
				w="100vw"
				justifyContent="center"
				alignItems={"center"}
				flexDirection={"column"}
			>
				<div>Review submitted!</div>
			</Flex>
		);
	}

	if (!data) {
		return (
			<Flex
				h="100vh"
				w="100vw"
				justifyContent="center"
				alignItems={"center"}
				flexDirection={"column"}
			>
				<Spinner></Spinner>
				<div>Loading...</div>
			</Flex>
		);
	}

	return (
		<Box display="grid" gridTemplateColumns="65% 35%" w="100%" minH="100vh">
			<DiffView diffPlainText={data.diff} />
			<Flex
				bgColor="rgb(243, 164, 74)"
				justifyContent="center"
				alignContent="center"
			>
				<VStack justifyContent={"center"} w="100%" px="4rem">
					<FormLabel alignSelf={"flex-start"}>
						General feedback
					</FormLabel>
					<Textarea
						bgColor="white"
						h={300}
						onChange={(e) => setFeedback(e.target.value)}
						value={feedback}
					></Textarea>
					<Button onClick={onSubmit}>Submit Review</Button>
				</VStack>
			</Flex>
		</Box>
	);
}
