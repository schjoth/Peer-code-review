import { Box } from "@chakra-ui/react";
import React from "react";

interface CodeLineProps {
	onClick: () => void;
	children: React.ReactNode;
	lineNumber: number;
}

const CodeLine: React.FC<CodeLineProps> = ({
	onClick,
	children,
	lineNumber,
}) => {
	return (
		<Box
			display="flex"
			flexDirection="row"
			alignContent="center"
			flexWrap={"wrap"}
			gap="1rem"
			w="100%"
			_hover={{ cursor: "pointer", bgColor: "rgb(243, 164, 74)" }}
			onClick={onClick}
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
				{children}
			</Box>
		</Box>
	);
};

export default CodeLine;
