"use client";
import React from "react";
import CodeLine from "./CodeLine";

interface CodeViewProps {
	code: string;
}

const CodeView: React.FC<CodeViewProps> = ({ code }) => {
	return (
		<>
			{code.split("\n").map((it, i) => (
				<CodeLine onClick={() => {}} key={i}>
					{it}
				</CodeLine>
			))}
		</>
	);
};

export default CodeView;
