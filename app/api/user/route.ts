import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { userId } = auth();

	const body = await req.json();
	const { userData } = body;

	try {
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: {
				userId,
			},
		});

		if (user) {
			await prisma.user.update({
				where: { userId },
				data: {
					userId,
					...userData,
				},
			});
		} else {
			await prisma.user.create({
				data: {
					userId,
					...userData,
				},
			});
		}

		return new NextResponse("User Created", { status: 201 });
	} catch (error) {
		console.log("USER_CREATE_ERROR", error);
	}
}
