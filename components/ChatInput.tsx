"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { useMutation } from "@tanstack/react-query";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { FC, HTMLAttributes, useContext, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput = ({ className, ...props }: ChatInputProps) => {
	const [input, setInput] = useState<string>("");
	const {
		messages,
		addMessage,
		removeMessage,
		updateMessage,
		setIsMessageUpdating,
	} = useContext(MessagesContext);

	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const { mutate: sendMessage, isLoading } = useMutation({
		mutationFn: async (message: Message) => {
			const response = await fetch("/api/stream-message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ messages: [message] }),
			});

			return response.body;
		},
		onMutate(message) {
			addMessage(message);
		},
		onSuccess: async (stream) => {
			if (!stream) throw new Error("No Stream");

			const id = nanoid();
			const responseMessage: Message = {
				id,
				isUserMessage: false,
				text: ``,
			};

			addMessage(responseMessage);
			setIsMessageUpdating(true);

			const reader = stream.getReader();
			const decoder = new TextDecoder();
			let done = false;

			while (!done) {
				const { value, done: doneReading } = await reader.read();
				done = doneReading;
				const chunkValue = decoder.decode(value);
				updateMessage(id, (prev) => prev + chunkValue);
			}

			setIsMessageUpdating(false);
			setInput("");

			setTimeout(() => {
				textareaRef.current?.focus();
			}, 10);
		},
	});

	return (
		<div {...props} className={cn("border-t border-destructive", className)}>
			<div className="relative mt-4 overflow-hidden border-none rounded-lg outline-none bg-zinc-300 ">
				<TextareaAutosize
					ref={textareaRef}
					disabled={isLoading}
					rows={2}
					maxRows={4}
					value={input}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();

							const message = {
								id: nanoid(),
								isUserMessage: true,
								text: input,
							};

							sendMessage(message);
						}
					}}
					onChange={(e) => {
						setInput(e.target.value);
					}}
					autoFocus
					placeholder="What are some symptoms of flu?"
					className=" peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
				/>

				<div className=" absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
					<kbd className="inline-flex items-center px-1 font-sans text-xs bg-white border border-gray-200 rounded ">
						{isLoading ? (
							<Loader2 className="w-3 h-3 animate-spin" />
						) : (
							<CornerDownLeft className="w-3 h-3 " />
						)}
					</kbd>
				</div>

				<div
					aria-hidden="true"
					className="absolute inset-x-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-destructive"
				/>
			</div>
		</div>
	);
};

export default ChatInput;
