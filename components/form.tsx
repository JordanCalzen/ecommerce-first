"use client";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import ImageInput from "./formInputs/image-input";
import { ProductProps } from "@/types/types";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
export type Inputs = {
	name: string;
	price: number;
	qty: number;
	description: string;
	image: string | null;
};
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export default function Form({ product }: { product?: ProductProps | null }) {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			name: product?.name,
			price: product?.price,
			qty: product?.qty,
			image: product?.image,
			description: product?.description,
		},
	});
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const initialImage =
		product?.image ||
		"https://img.freepik.com/premium-vector/single-gray-square-with-simple-human-silhouette-inside-light-gray-background_213497-5040.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid";
	const [imageUrl, setImageUrl] = useState(initialImage);
	async function formSubmit(data: Inputs) {
		data.image = imageUrl;
		data.price = Number(data.price);
		data.qty = Number(data.qty);
		if (product) {
			try {
				setLoading(true);
				const response = await fetch(
					`${baseUrl}/api/v1/products/${product.id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					}
				);
				if (response) {
					setLoading(false);
					alert("Updated Successfully");
					router.push("/");
					router.refresh();
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
				alert("failed to update");
			}
		} else {
			try {
				setLoading(true);
				console.log(data);
				const res = await fetch(`${baseUrl}/api/v1/products`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});
				if (res) {
					setLoading(false);
					alert("Created Successfully");
					router.push("/");
					router.refresh();   
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
				alert("Failed to create the Product");
			}
		}
	}
	return (
		<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-lg">
				<h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
					Product Form
				</h1>

				<p className="mx-auto mt-4 max-w-md text-center text-gray-500">
					Enter your product from here
				</p>

				<form
					onSubmit={handleSubmit(formSubmit)}
					action="#"
					className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
				>
					<p className="text-center text-lg font-medium">
						Enter valid products only
					</p>

					<div>
						<label htmlFor="name" className="sr-only">
							name
						</label>

						<div className="relative">
							<input
								type="text"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter product name"
								{...register("name", { required: true })}
							/>
							{errors.name && (
								<span className="text-red-600">This field is required</span>
							)}

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
									/>
								</svg>
							</span>
						</div>
					</div>

					<div>
						<label htmlFor="price" className="sr-only">
							Price
						</label>

						<div className="relative">
							<input
								type="number"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter Price"
								{...register("price", { required: true })}
							/>
							{errors.price && (
								<span className="text-red-600">This field is required</span>
							)}

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div>
						<label htmlFor="qty" className="sr-only">
							Qty
						</label>

						<div className="relative">
							<input
								type="number"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter Qty"
								{...register("qty", { required: true })}
							/>
							{errors.qty && (
								<span className="text-red-600">This field is required</span>
							)}

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div>
						<label htmlFor="description" className="sr-only">
							Description
						</label>

						<div className="relative">
							<input
								type="text"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter description"
								{...register("description", { required: true })}
							/>
							{errors.description && (
								<span className="text-red-600">This field is required</span>
							)}

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div>
						<ImageInput
							title="Product Image"
							imageUrl={imageUrl}
							setImageUrl={setImageUrl}
							endpoint="imageUploader"
						/>
					</div>
					{loading ? (
						<button
							type="submit"
							className=" flex justify-center items-center gap-2 w-full rounded-lg bg-indigo-400 px-5 py-3 text-sm font-medium text-black"
						>
							<Loader className="w-4 h-4 animate-spin" />
							{product ? "Updating..." : "Submit..."}
						</button>
					) : (
						<button
							type="submit"
							className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
						>
							{product ? "Update product" : "Submit product"}
						</button>
					)}
				</form>
			</div>
		</div>
	);
}
