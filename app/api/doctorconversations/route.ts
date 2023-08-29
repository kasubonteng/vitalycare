import getCurrentUser from "@/app/(dashboard)/(routes)/doctors/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser();

		const body = await req.json();

		const { userId } = body;

		if (!currentUser?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const existingConversations = await prisma.conversation.findMany({
			where: {
				OR: [
					{
						userIds: {
							equals: [currentUser.id, userId],
						},
					},
					{
						userIds: {
							equals: [userId, currentUser.id],
						},
					},
				],
			},
		});

		const conversation = existingConversations[0];
		// console.log(conversation);
		// if (!conversation) {
		// 	console.log("here");
		// }
		if (conversation) {
			return NextResponse.json(conversation);
		}

		const newConversation = await prisma.conversation.create({
			data: {
				users: {
					connect: [
						{
							id: currentUser.id,
						},
						{ id: userId },
					],
				},
			},
			include: {
				users: true,
			},
		});

		return NextResponse.json(newConversation);
	} catch (error) {
		console.log(error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
