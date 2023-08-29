import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const getConversationById = async (conversationId: string) => {
	try {
		const { userId } = auth();

		if (!userId) {
			return null;
		}
		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});
		return conversation;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default getConversationById;
