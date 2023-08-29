"use client";

import { FullMessageType } from "@/app/(dashboard)/(routes)/doctors/conversations/[conversationId]/types";
import DoctorConversationForm from "./DoctorConversationForm";
import { useEffect, useRef, useState } from "react";
import DoctorMessageBox from "./DoctorMessageBox";
import useConversation from "@/lib/hooks/useConversationId";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface DoctorConversationProps {
	initialMessages: FullMessageType[];
}

const DoctorConversation = ({ initialMessages }: DoctorConversationProps) => {
	const [messages, setMessages] = useState(initialMessages);
	const { conversationId } = useConversation();
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		axios.post(`/api/doctorconversations/${conversationId}/seen`);
	}, [conversationId]);

	useEffect(() => {
		pusherClient.subscribe(conversationId);
		bottomRef.current?.scrollIntoView();

		const messageHandler = (message: FullMessageType) => {
			axios.post(`/api/doctorconversations/${conversationId}/seen`);

			setMessages((current) => {
				if (find(current, { id: message.id })) return current;

				return [...current, message];
			});

			bottomRef.current?.scrollIntoView();
		};

		pusherClient.bind("messages:new", messageHandler);

		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind("messages:new", messageHandler);
		};
	}, [conversationId]);

	return (
		<div className="flex-1 overflow-y-auto ">
			{messages.map((message, i) => (
				<DoctorMessageBox
					isLast={i === messages.length - 1}
					key={message.id}
					data={message}
				/>
			))}
			<div ref={bottomRef} className="pt-24 " />
		</div>
	);
};

export default DoctorConversation;
