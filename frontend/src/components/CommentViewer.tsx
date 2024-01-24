import React from "react";
import { Accordion, Box, Text, VStack } from "@chakra-ui/react";
import Comment from "./Comment";

interface CommentViewerProps {
	code: string;
	comments: { lineNumber: number; text: string }[];
}

const CommentViewer: React.FC<CommentViewerProps> = ({ code, comments }) => {
	const getComments = (idx: number) => {
		let commentsForLine = comments.filter((c) => c.lineNumber == idx);

		return (
			<>
				{commentsForLine.map(({ text }, i) => (
					<Comment text={text} key={i} author={"Lars Laks"}></Comment>
				))}
			</>
		);
	};

	return (
		<Accordion allowMultiple>
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
							<Box
								display="flex"
								flexDirection="row"
								alignContent="center"
								flexWrap={"wrap"}
								gap="1rem"
								w="100%"
							>
								<Box as="span" mr="1rem">
									{lineNumber}
								</Box>
								<Box
									as="span"
									w="100%"
									margin={0}
									flex="1"
									textAlign="left"
									whiteSpace="preserve"
								>
									{it}
								</Box>
							</Box>

							{getComments(lineNumber)}
						</React.Fragment>
					);
				})}
			</VStack>
		</Accordion>
	);
};

export default CommentViewer;
