import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface CommentProps {
	text: string;
	author: string;
}

const Comment: FC<CommentProps> = ({ text, author }) => {
	return (
		<AccordionItem w="100%" border="1px solid black">
			<h2>
				<AccordionButton>
					<Box as="span" flex="1" textAlign="left">
						{author}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>{text}</AccordionPanel>
		</AccordionItem>
	);
};

export default Comment;
