import { fetchSingleProduct } from "@/actions/fetchapi";
import Form from "@/components/form";
import React from "react";

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = await fetchSingleProduct(id);
	return <Form product={product} />;
}
