"use client";
import React from "react";
import CodeLine from "./CodeLine";
import { Accordion, VStack } from "@chakra-ui/react";
import { useCommentStore } from "@/store/CommentStore";
import CommentEditor from "./CommentEditor";

interface CodeViewProps {
	code: string;
}

const CodeView: React.FC<CodeViewProps> = ({ code }) => {
	const { comments, addEmptyComment } = useCommentStore();

	const getComment = (idx: number) => (
		<CommentEditor
			comment={comments.find((c) => c.line == idx)}
			lineNumber={idx}
		/>
	);
	console.log(comments);

	const handleOnClick = (idx: number) => {
		console.log("hei");
		addEmptyComment(idx);
	};

	return (
		<VStack
			alignItems="flex-start"
			p="4rem"
			spacing={0}
			overflowX={"scroll"}
		>
			{code.split("\n").map((it, i) => (
				<React.Fragment key={i}>
					<CodeLine onClick={() => handleOnClick(i)} lineNumber={i}>
						{it}
					</CodeLine>
					{getComment(i)}
				</React.Fragment>
			))}
		</VStack>
	);
};

export default CodeView;
