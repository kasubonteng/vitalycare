"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "./ui/form";
import { z } from "zod";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import useConversation from "@/lib/hooks/useConversationId";

interface DoctorConversationFormProps {}

const DoctorConversationForm = () => {
	const { conversationId } = useConversation();
	const formSchema = z.object({
		message: z.string(),
	});

	const form = useForm({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		form.setValue("message", "", { shouldValidate: true });

		axios.post("/api/doctormessages", {
			...values,
			conversationId,
		});
	};
	return (
		<div className="flex items-center w-full gap-2 px-4 py-4 bg-white border-t lg:gap-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex items-center w-full gap-2 lg:gap-4"
				>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem className="relative w-full ">
								<Input
									{...field}
									type="text"
									placeholder="Write a message"
									autoComplete="message"
									required
									className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
								/>
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="flex items-center justify-center p-4 rounded-full cursor-pointer bg-destructive hover:bg-destructive/90"
					>
						<Send size={18} className="text-white " />
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default DoctorConversationForm;
