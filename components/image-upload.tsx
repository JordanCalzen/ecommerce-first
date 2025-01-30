"use client";

import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";

export default function Home() {
	const [image, setImage] = useState(
		"https://img.freepik.com/premium-vector/single-gray-square-with-simple-human-silhouette-inside-light-gray-background_213497-5040.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid"
	);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="w-40 h-40">
				<img className="w-full object-cover h-full" src={image} alt="" />
			</div>
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={(res) => {
					// Do something with the response
					console.log("Files: ", res);
					setImage(res[0].url);
					alert("Upload Completed");
				}}
				onUploadError={(error: Error) => {
					// Do something with the error.
					alert(`ERROR! ${error.message}`);
				}}
			/>
		</main>
	);
}
