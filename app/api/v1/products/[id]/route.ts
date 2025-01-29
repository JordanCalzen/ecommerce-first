import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	try {
		const singleProduct = await db.product.findFirst({
			where: {
				id,
			},
		});
		return NextResponse.json(
			{
				data: singleProduct,
				error: null,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				data: null,
				error: "Something went wrong",
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;

	try {
		const deleteProduct = await db.product.delete({
			where: {
				id,
			},
		});
		return NextResponse.json(
			{
				message: "Product deleted",
				error: null,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				data: null,
				error: "Something went wrong",
			},
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const data = await request.json();
	const existingProduct = await db.product.findFirst({
		where: {
			id,
		},
	});
	if (!existingProduct) {
		return NextResponse.json(
			{
				data: null,
				error: "no such product",
			},
			{ status: 404 }
		);
	}
	try {
		const updatedProduct = await db.product.update({
			where: {
				id,
			},
			data: data,
		});
		return NextResponse.json(
			{
				message: "Product updated",
				data: updatedProduct,
				error: null,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				data: null,
				error: "Something went wrong",
			},
			{ status: 500 }
		);
	}
}
