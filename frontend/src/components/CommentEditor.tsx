import { Comment, useCommentStore } from "@/store/CommentStore";
import { Box, Button, ButtonGroup, Textarea } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";

interface CommentEditorProps {
	comment: Comment | undefined;
}

const CommentEditor: React.FC<CommentEditorProps> = ({ comment }) => {
	// const [value, setValue] = useState(comment?.comment || "");

	// let handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
	// 	let inputValue = e.target.value;
	// 	setValue(inputValue);
	// };

	const { saveComment, removeComment } = useCommentStore();

	if (!comment) return <></>;

	const handleOnClick = (value: string) => {
		saveComment({ line: comment?.line, comment: value });
	};

	// useEffect(() => {
	// 	let newValue = comment?.comment || "";
	// 	// setValue(newValue);
	// }, [comment]);

	return (
		<Box w="100%">
			<Textarea
				value={comment.comment}
				onChange={(e) => handleOnClick(e.target.value)}
			></Textarea>
			<ButtonGroup>
				<Button
					colorScheme="red"
					onClick={() => removeComment(comment.line)}
				>
					Discard
				</Button>
			</ButtonGroup>
		</Box>
	);
};

export default CommentEditor;
