"use client";
import CommentEditor from "@/components/CommentEditor";
import { useCommentStore } from "@/store/CommentStore";
import { FC, ReactNode, useEffect, useState } from "react";
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
			console.log("onClick");
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
		console.log(result);
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
	);

	return <div>{files.map(renderFile)}</div>;
};

export default DiffView;
