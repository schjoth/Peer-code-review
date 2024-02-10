import { Comment, useCommentStore } from "@/store/CommentStore";
import { Box, Button, ButtonGroup, Textarea } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";

interface CommentEditorProps {
	comment: Comment;
}

const CommentEditor: React.FC<CommentEditorProps> = ({
	comment: { changeKey, file, comment },
}) => {
	// const [value, setValue] = useState(comment?.comment || "");

	// let handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
	// 	let inputValue = e.target.value;
	// 	setValue(inputValue);
	// };

	const { saveComment, removeComment } = useCommentStore();

	const handleOnClick = (value: string) => {
		saveComment({ file, changeKey, comment: value });
	};

	// useEffect(() => {
	// 	let newValue = comment?.comment || "";
	// 	// setValue(newValue);
	// }, [comment]);

	return (
		<Box w="100%">
			<Textarea
				value={comment}
				onChange={(e) => handleOnClick(e.target.value)}
			></Textarea>
			<ButtonGroup>
				<Button
					colorScheme="red"
					onClick={() => removeComment(file, changeKey)}
				>
					Discard
				</Button>
			</ButtonGroup>
		</Box>
	);
};

export default CommentEditor;
