"use client";
import CommentEditor from "@/components/CommentEditor";
import { useCommentStore } from "@/store/CommentStore";
import { ReactNode, useEffect, useState } from "react";
import { parseDiff, Diff, Hunk, FileData, getChangeKey } from "react-diff-view";
import "react-diff-view/style/index.css"; //Gives the appropiate styling to the diff view

export default function Home() {
	return <div>Hei på deg</div>;
}
