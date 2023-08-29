import getCurrentUser from "@/app/(dashboard)/(routes)/doctors/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser();

		const body = await req.json();

		const { message, conversationId } = body;

		if (!currentUser?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const newMessage = await prisma.message.create({
			data: {
				body: message,
				conversation: {
					connect: {
						id: conversationId,
					},
				},
				sender: {
					connect: {
						id: currentUser.id,
					},
				},
				seen: {
					connect: {
						id: currentUser.id,
					},
				},
			},
			include: {
				seen: true,
				sender: true,
			},
		});

		const updatedConversation = await prisma.conversation.update({
			where: {
				id: conversationId,
			},
			data: {
				lastMessageAt: new Date(),
				messages: {
					connect: {
						id: newMessage.id,
					},
				},
			},
			include: {
				users: true,
				messages: {
					include: {
						seen: true,
					},
				},
			},
		});

		await pusherServer.trigger(conversationId, "messages:new", newMessage);

		const lastMessage =
			updatedConversation.messages[updatedConversation.messages.length - 1];

		updatedConversation.users.map((user) => {
			pusherServer.trigger(user.userId!, "conversation:update", {
				id: conversationId,
				messages: [lastMessage],
			});
		});

		return NextResponse.json(newMessage);
	} catch (error) {
		console.log("ERROR_MESSAGES", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
