import {
	Box,
	Button,
	Flex,
	FormLabel,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import CodeView from "@/components/CodeView";

export default async function Home() {
	const code = `import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`;

	var test = await fetch("http://0.0.0.0:8090/review/1").then((res) =>
		res.json()
	);

	code.split("\n").forEach((a) => console.log(a));

	return (
		<Box display="grid" gridTemplateColumns="50% 50%" w="100%" minH="100vh">
			<CodeView code={code} />
			<Flex
				bgColor="rgb(243, 164, 74)"
				justifyContent="center"
				alignContent="center"
			>
				<VStack justifyContent={"center"} w="100%" px="4rem">
					<FormLabel alignSelf={"flex-start"}>
						General feedback
					</FormLabel>
					<Textarea bgColor="white" h={300}></Textarea>
					<Button>Submit Review</Button>
				</VStack>
			</Flex>
		</Box>
	);
}
