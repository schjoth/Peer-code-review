import React, { useEffect, useRef, useState } from "react";

interface CodeLineProps {
	onClick: () => void;
	children: React.ReactNode;
}

const CodeLine: React.FC<CodeLineProps> = ({ onClick, children }) => {
	const [hover, setHover] = useState<boolean>(false);
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const addHover = () => setHover(true);
		const removeHover = () => setHover(false);

		ref.current?.addEventListener("mouseover", addHover);
		ref.current?.addEventListener("mouseout", removeHover);

		return () => {
			ref.current?.removeEventListener("mouseover", addHover);
			ref.current?.removeEventListener("mouseout", removeHover);
		};
	}, []);

	return (
		<span style={hover ? styles.hover : styles.normal} ref={ref}>
			<span
				onClick={onClick}
				style={{
					whiteSpace: "preserve",
					width: "100%",
					paddingRight: 10,
				}}
			>
				{children}
			</span>
			{hover && (
				<span
					style={{
						alignSelf: "flex-end",
						justifySelf: "flex-end",
						marginLeft: "-10px",
					}}
				>
					+
				</span>
			)}
		</span>
	);
};

const styles = {
	normal: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		padding: "0 10px",
	},

	hover: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		whiteSpace: "preserve",
		cursor: "pointer",
		background: "rgba(120,120,120, 0.6)",
		padding: "0 10px",
	},
};

export default CodeLine;
