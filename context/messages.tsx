import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { createContext, useState } from "react";

export const MessagesContext = createContext<{
	messages: Message[];
	isMessageUpdating: boolean;
	addMessage: (message: Message) => void;
	removeMessage: (id: string) => void;
	updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
	setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
	messages: [],
	isMessageUpdating: false,
	addMessage: () => {},
	removeMessage: () => {},
	updateMessage: () => {},
	setIsMessageUpdating: () => {},
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
	const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: nanoid(),
			text: "Welcome to VitalyBot, your online health assistant. I can help you with information and advice on various health topics, such as nutrition, fitness, mental health, diseases, and more. To get started, please type your question in the chat box below. For example, you can ask me: What are some healthy foods to eat for breakfast? How can I cope with stress and anxiety? What are the symptoms of diabetes? I can only answer questions related to health. If you ask me something else, I will politely remind you of my scope and ask you to rephrase your question. I hope you find VitalyBot useful and informative. Let’s chat! 😊",
			isUserMessage: false,
		},
	]);

	const addMessage = (message: Message) => {
		setMessages((prev) => [...prev, message]);
	};

	const removeMessage = (id: string) => {
		setMessages((prev) => prev.filter((message) => message.id !== id));
	};

	const updateMessage = (
		id: string,
		updateFn: (prevText: string) => string
	) => {
		setMessages((prev) =>
			prev.map((message) => {
				if (message.id === id) {
					return { ...message, text: updateFn(message.text) };
				}

				return message;
			})
		);
	};

	return (
		<MessagesContext.Provider
			value={{
				messages,
				addMessage,
				removeMessage,
				updateMessage,
				isMessageUpdating,
				setIsMessageUpdating,
			}}
		>
			{children}
		</MessagesContext.Provider>
	);
}
