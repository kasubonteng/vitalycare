"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useContext } from "react";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages = ({ className, ...props }: ChatMessagesProps) => {
	const { messages } = useContext(MessagesContext);
	const invertMessages = [...messages].reverse();

	return (
		<div
			{...props}
			className={cn("flex flex-col-reverse gap-3 overflow-y-auto", className)}
		>
			<div className="flex-1 flex-grow" />
			{invertMessages.map((message) => (
				<div key={message.id} className="chat-message">
					<div
						className={cn("flex items-end", {
							"justify-end": message.isUserMessage,
						})}
					>
						<div
							className={cn(
								"flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden",
								{
									" order-1 items-end": message.isUserMessage,
									" order-2 items-start": !message.isUserMessage,
								}
							)}
						>
							<p
								className={cn("px-4 py-2 rounded-lg", {
									" bg-destructive text-white": message.isUserMessage,
									"bg-gray-200 text-gray-900": !message.isUserMessage,
								})}
							>
								{message.text}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChatMessages;
