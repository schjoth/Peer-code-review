"use client";
import React from "react";
import CodeLine from "./CodeLine";
import { VStack } from "@chakra-ui/react";
import { useCommentStore } from "@/store/CommentStore";
import CommentEditor from "./CommentEditor";

interface CodeViewProps {
	code: string;
}

const CodeView: React.FC<CodeViewProps> = ({ code }) => {
	const { comments, addEmptyComment } = useCommentStore();

	const getComments = (idx: number) => {
		let comment = comments.find((c) => c.line == idx);

		return <CommentEditor comment={comment} lineNumber={idx} />;
	};

	const handleOnClick = (idx: number) => {
		addEmptyComment(idx);
	};

	return (
		<VStack
			alignItems="flex-start"
			p="4rem"
			spacing={0}
			overflowX={"scroll"}
		>
			{code.split("\n").map((it, i) => {
				let lineNumber = i + 1;
				return (
					<React.Fragment key={lineNumber}>
						<CodeLine
							onClick={() => handleOnClick(lineNumber)}
							lineNumber={lineNumber}
						>
							{it}
						</CodeLine>
						{getComments(lineNumber)}
					</React.Fragment>
				);
			})}
		</VStack>
	);
};

export default CodeView;
