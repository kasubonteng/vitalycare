import { redis } from "@/lib/redis";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

interface DoctorChatProps {
	params: {
		chatId: string;
	};
}

// async function getChatMessages(chatId: string) {
// 	try {
// 		const result: string[] = await
// 	} catch (error) {
// 		notFound()
// 	}
// }

const DoctorChat = async ({ params }: DoctorChatProps) => {
	await redis.set("hello", "hello");
	const { chatId } = params;
	const { userId } = auth();

	if (!userId) return notFound();
	console.log(userId);

	// const [userId1, userId2] = chatId.split("--");

	// if (user.id !== userId1 && user.id !== userId2) {
	// 	notFound();
	// }

	// const chatPartnerId = user.id === userId1 ? userId2 : userId1;
	// const chatPartner = await redis.get(`user:${chatPartnerId}`);
	// const initialMessages = await getChatMessages(chatId)
	return (
		<div>
			{params.chatId}
			{userId}
		</div>
	);
};

export default DoctorChat;
