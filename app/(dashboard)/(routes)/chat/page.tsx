"use client";

import * as z from "zod";
import { Heading } from "@/components/Heading";
import { Church, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import { BotAvatar } from "@/components/BotAvatar";
import Loading from "@/components/Loading";

const ChatPage = () => {
	const router = useRouter();

	const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessages: ChatCompletionRequestMessage = {
				role: "user",
				content: values.prompt,
			};

			const newMessages = [...messages, userMessages];

			const response = await axios.post("/api/chat", {
				messages: newMessages,
			});

			setMessages((prev) => [...prev, userMessages, response.data]);

			form.reset();
		} catch (error) {
			console.log(error);
		} finally {
			router.refresh();
		}
	};
	return (
		<div className="relative p-2">
			<div className="flex">
				<Heading
					text="Chat"
					subtext="Have any health related questions? Ask Vitaly Bot"
					bgColor="bg-green-500/10"
					iconColor="text-green-500"
					icon={MessageSquare}
				/>
			</div>
			<div className="p-6 mb-20 space-y-4">
				<div className="flex flex-col gap-y-4">
					<div className="flex items-start w-full p-8 rounded-lg gap-x-8 bg-muted">
						<BotAvatar />
						<div className="space-y-3 ">
							<p className="text-sm ">
								Welcome to VitalyBot, your online health assistant. I can help
								you with information and advice on various health topics, such
								as nutrition, fitness, mental health, diseases, and more.
							</p>
							<p className="text-sm ">
								Please note that I am not a medical professional and I cannot
								diagnose, treat, or prescribe anything for you. If you have a
								serious or urgent health issue, please contact your doctor or
								call emergency services.{" "}
							</p>{" "}
							<p className="text-sm ">
								To get started, please type your question in the chat box below.
								For example, you can ask me: What are some healthy foods to eat
								for breakfast? How can I cope with stress and anxiety? What are
								the symptoms of diabetes?
							</p>
							<p className="text-sm ">
								I can only answer questions related to health. If you ask me
								something else, I will politely remind you of my scope and ask
								you to rephrase your question. I hope you find VitalyBot useful
								and informative. Let’s chat! 😊
							</p>
						</div>
					</div>
					{messages.map((message) => (
						<div
							key={message.content}
							className={cn(
								"p-8 w-full flex items-start gap-x-8 rounded-lg",
								message.role === "user"
									? "bg-white border border-black/10"
									: "bg-muted"
							)}
						>
							{message.role === "user" ? <UserAvatar /> : <BotAvatar />}
							<p className="text-sm ">{message.content}</p>
						</div>
					))}
					{isLoading && (
						<div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
							<Loading />
						</div>
					)}
					{/* {messages.length === 0 && !isLoading && (
					<Empty label="No conversation started" />
				)} */}
				</div>
			</div>
			<div className="fixed bottom-6 left-1/3">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid w-full grid-cols-12 gap-2 p-4 px-3 bg-white border border-black rounded-lg md:px-6 focus-within:shadow-sm"
						>
							<FormField
								name="prompt"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="p-0 m-0 ">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												placeholder="What are the symptoms of flu?"
												disabled={isLoading}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="w-full col-span-12 lg:col-span-2 bg-destructive disabled:bg-slate-500 disabled:cursor-not-allowed"
								disabled={isLoading}
							>
								Submit
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default ChatPage;
