import { prisma } from "@/lib/prisma";

const getMessages = async (conversationId: string) => {
	try {
		const messages = await prisma.message.findMany({
			where: {
				conversationId: conversationId,
			},
			include: {
				sender: true,
				seen: true,
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		return messages;
	} catch (error) {
		console.log("MESSAGE_ERROR", error);
		return [];
	}
};

export default getMessages;
