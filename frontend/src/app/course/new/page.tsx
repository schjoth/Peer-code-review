"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const CreateNewCourse = () => {
	const searchParams = useSearchParams();
	const iId = searchParams.get("installation_id");
	const router = useRouter();

	const [courseName, setCourseName] = useState<string>("");

	const createCourse = async () => {
		await fetch("/api/github/" + iId, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: courseName }),
		});
		router.push("/");
	};

	return (
		<Box
			bg="orange"
			w="100vw"
			h="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<VStack
				bg="white"
				w="500"
				h="300"
				px="2rem"
				py="1rem"
				justifyContent="space-around"
				borderRadius="20px"
			>
				<Box>
					<FormLabel htmlFor="cn">
						Enter Github Organization name
					</FormLabel>
					<Input
						id="cn"
						type="text"
						value={courseName}
						onChange={(e) => setCourseName(e.target.value)}
					></Input>
				</Box>
				<Button onClick={createCourse}>Create new course</Button>
			</VStack>
		</Box>
	);
};

export default CreateNewCourse;
