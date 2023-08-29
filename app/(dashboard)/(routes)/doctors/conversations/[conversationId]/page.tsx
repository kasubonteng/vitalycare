import { prisma } from "@/lib/prisma";
import getConversationById from "./getConversationById";
import getMessages from "./getMessages";
import DoctorConversation from "@/components/DoctorConversation";

interface ConversationPageInterface {
	params: {
		conversationId: string;
	};
}

const ConversationPage = async ({ params }: ConversationPageInterface) => {
	const conversation = await getConversationById(params.conversationId);
	const messages = await getMessages(params.conversationId);

	if (!conversation) {
		return (
			<div className="h-full ">
				<div className="flex flex-col h-full ">No chats to show</div>
			</div>
		);
	}
	return (
		<div className="h-full ">
			<div className="flex flex-col h-full ">
				<DoctorConversation />
			</div>
		</div>
	);
};

export default ConversationPage;
