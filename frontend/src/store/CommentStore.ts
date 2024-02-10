import { create } from "zustand";

export type Comment = {
	//line is used as id, so can only have one comment per line, however if support for multiple files are added, thie logic needs update
	changeKey: string;
	comment: string;
	file: string;
};

interface CommentStoreState {
	comments: Array<Comment>;
	saveComment: (comment: Comment) => void;
	addEmptyComment: (file: string, changeKey: string) => void;
	removeComment: (file: string, changeKey: string) => void;
	clear: () => void;
}

const filterAwayComment = (
	comments: Array<Comment>,
	file: string,
	changeKey: string
) => comments.filter((c) => c.file !== file || c.changeKey !== changeKey);

export const useCommentStore = create<CommentStoreState>()((set, get) => ({
	comments: [],
	saveComment: (comment: Comment) => {
		set((state) => ({
			comments: [
				...filterAwayComment(
					state.comments,
					comment.file,
					comment.changeKey
				),
				comment,
			],
		}));
	},
	removeComment: (file, changeKey) =>
		set((state) => ({
			comments: filterAwayComment(state.comments, file, changeKey),
		})),
	addEmptyComment: (file, changeKey) => {
		var curr = get().comments;
		if (!curr.find((c) => c.file == file && c.changeKey == changeKey)) {
			set(() => ({
				comments: [...curr, { comment: "", changeKey, file }],
			}));
		}
	},
	clear: () => set(() => ({ comments: [] })),
}));
