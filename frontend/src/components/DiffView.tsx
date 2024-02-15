"use client";
import CommentEditor from "@/components/CommentEditor";
import { useCommentStore } from "@/store/CommentStore";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { parseDiff, Diff, Hunk, FileData, getChangeKey } from "react-diff-view";
import "react-diff-view/style/index.css"; //Gives the appropiate styling to the diff view

interface DiffViewProps {
	diffPlainText: string;
}

const DiffView: FC<DiffViewProps> = ({ diffPlainText }) => {
	const { comments, addEmptyComment } = useCommentStore();

	const files = parseDiff(diffPlainText);

	const codeEvents = (filepath: string) => ({
		onClick(data: any, e: any) {
			const changeKey = getChangeKey(data.change);
			addEmptyComment(filepath, changeKey);
		},
	});

	//Creates a map of CommentEditors to the changeKey
	const getWidgets = (filepath: string) => {
		const result: Record<string, ReactNode> = {};

		comments
			.filter((c) => c.file == filepath)
			.forEach((comment) => {
				result[comment.changeKey] = (
					<CommentEditor comment={comment}></CommentEditor>
				);
			});
		return result;
	};

	const renderFile = ({
		oldRevision,
		newRevision,
		type,
		hunks,
		newPath,
		oldPath,
	}: FileData) => (
		<Box>
			<Text
				as="h2"
				py="0.5rem"
				px="1rem"
				bgColor={"#CCC"}
				fontWeight="500"
			>
				{newPath !== oldPath
					? oldPath + " -> " + newPath
					: newPath || oldPath}
			</Text>
			<Diff
				key={oldRevision + "-" + newRevision}
				viewType="split"
				diffType={type}
				hunks={hunks}
				codeEvents={codeEvents(newPath || oldPath)}
				widgets={getWidgets(newPath || oldPath)}
			>
				{(hunks) =>
					hunks.map((hunk) => (
						<Hunk
							key={hunk.content + hunk.newStart + hunk.newLines}
							hunk={hunk}
						/>
					))
				}
			</Diff>
		</Box>
	);

	return (
		<Flex
			p="2rem"
			gap="3rem"
			flexDir="column"
			overflowY={"scroll"}
			maxH="100vh"
		>
			{files.map(renderFile)}
		</Flex>
	);
};

export default DiffView;
