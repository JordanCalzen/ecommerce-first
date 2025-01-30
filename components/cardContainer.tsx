import React from "react";
import Card from "./card";
import { fetchApi } from "@/actions/fetchapi";
import Link from "next/link";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default async function CardContainer() {
	const fetchedProducts = await fetchApi();
	console.log(fetchedProducts);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
			<div className="flex flex-col gap-10 items-center justify-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
				<Link href="/form">
					<Button className="ml-2 w-20 h-20">
						<Plus className="w-10 h-10 " />
					</Button>
				</Link>
				<h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
					ADD PRODUCT
				</h1>
			</div>

			{fetchedProducts.map((product) => {
				return <Card key={product.id} product={product} id={product.id} />;
			})}
		</div>
	);
}
