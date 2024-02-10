"use client";
import {
	Box,
	Button,
	Flex,
	FormLabel,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { useCommentStore } from "@/store/CommentStore";
import { useEffect, useState } from "react";
import { CreateCommentBody } from "@/app/api/github/[installationId]/repos/[owner]/[repo]/pulls/[pull_number]/comments/route";
import DiffView from "@/components/DiffView";

export default function Home({
	params: { sourceId },
}: {
	params: { sourceId: string };
}) {
	const { comments, clear: clearStore } = useCommentStore();
	const [diffText, setDiffText] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			await fetch(
				"/api/github/46797246/repos/Testing-PCR/demo-repository/pulls/1"
			)
				.then((res) => res.json())
				.then((data) => setDiffText(data.diff));
		};

		fetchData();
	}, []);

	const [feedback, setFeedback] = useState("");

	const onSubmit = async () => {
		console.log("skal prøve å persistere data");

		const body: CreateCommentBody = {
			comments: comments,
			commit_id: "cb50c0436d55aec507b7db213af64fd66cf3b27f",
			feedback: feedback,
		};

		await fetch(
			"/api/github/46797246/repos/Testing-PCR/demo-repository/pulls/1/comments",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
				cache: "no-store",
			}
		).then((res) => {
			if (res.ok) {
				clearStore();
				setFeedback("");
				//TODO: redirect til ny side
			}
		});
	};

	return (
		<Box display="grid" gridTemplateColumns="65% 35%" w="100%" minH="100vh">
			<DiffView diffPlainText={diffText} />
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
					></Textarea>
					<Button onClick={onSubmit}>Submit Review</Button>
				</VStack>
			</Flex>
		</Box>
	);
}
