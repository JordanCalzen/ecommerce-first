"use server";
import { ProductProps } from "@/types/types";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export async function fetchApi() {
	try {
		const response = await fetch(`${baseUrl}/api/v1/products`);
		const results = await response.json();
		return results.data as ProductProps[];
	} catch (error) {
		return [];
	}
}
