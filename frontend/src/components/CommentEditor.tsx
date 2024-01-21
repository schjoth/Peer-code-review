import { Comment, useCommentStore } from "@/store/CommentStore";
import { Box, Button, ButtonGroup, Textarea } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";

interface CommentEditorProps {
	comment: Comment | undefined;
	lineNumber: number;
}

const CommentEditor: React.FC<CommentEditorProps> = ({
	comment,
	lineNumber,
}) => {
	const [value, setValue] = useState(comment?.comment || "");
	const [lastStoredValue, setLastStoredValue] = useState<string>(value);

	let handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		let inputValue = e.target.value;
		setValue(inputValue);
	};

	const { saveComment, removeComment } = useCommentStore();
	const handleOnClick = () => {
		saveComment({ line: lineNumber, comment: value });
		setLastStoredValue(value);
	};

	if (!comment) return <></>;
	const isDisabled = value === lastStoredValue;
	console.log("should be disabled: ", isDisabled);

	return (
		<Box w="100%">
			<Textarea value={value} onChange={handleInputChange}></Textarea>
			<ButtonGroup>
				<Box
					as="button"
					bgColor="green"
					color="white"
					p="0.5rem 1rem"
					borderRadius={5}
					onClick={handleOnClick}
					disabled={isDisabled}
					_disabled={{ bgColor: "rgba(0,100,0,0.5)" }}
				>
					Save
				</Box>
				<Button
					colorScheme="red"
					onClick={() => removeComment(lineNumber)}
				>
					Discard
				</Button>
			</ButtonGroup>
		</Box>
	);
};

export default CommentEditor;
