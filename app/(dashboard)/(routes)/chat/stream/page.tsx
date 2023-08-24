import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";

const ChatPage = () => {
	return (
		<div className="flex flex-col justify-between max-h-screen min-h-[45rem]">
			<ChatMessages className="px-2 py-3 " />
			<ChatInput className="px-4 " />
		</div>
	);
};

export default ChatPage;
