import { create } from "zustand";

export type Comment = {
	//line is used as id, so can only have one comment per line, however if support for multiple files are added, thie logic needs update
	line: number;
	comment: string;
};

interface CommentStoreState {
	comments: Array<Comment>;
	saveComment: (comment: Comment) => void;
	addEmptyComment: (lineNumber: number) => void;
	removeComment: (lineNumber: number) => void;
}

export const useCommentStore = create<CommentStoreState>()((set, get) => ({
	comments: [],
	saveComment: (comment: Comment) => {
		set((state) => ({
			comments: [
				...state.comments.filter((c) => c.line !== comment.line),
				comment,
			],
		}));
	},
	removeComment: (lineNumber) =>
		set((state) => ({
			comments: state.comments.filter((c) => c.line !== lineNumber),
		})),
	addEmptyComment: (lineNumber) => {
		var curr = get().comments;
		if (!curr.find((c) => c.line == lineNumber)) {
			set(() => ({
				comments: [...curr, { comment: "", line: lineNumber }],
			}));
		}
	},
}));
