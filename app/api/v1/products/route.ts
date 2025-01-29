import { Inputs } from "@/components/form";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const data: Inputs = await request.json();
	try {
		const createdProduct = await db.product.create({
			data,
		});
		return NextResponse.json(
			{
				message: "created",
				data: createdProduct,
				error: null,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				data: null,
				error: "something went wrong",
			},
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const products = await db.product.findMany();
		return NextResponse.json(
			{
				data: products,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				error: "failed to fetch",
			},
			{ status: 500 }
		);
	}
}
