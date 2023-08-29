"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "./ui/form";
import { z } from "zod";
import axios from "axios";

interface DoctorConversationInputProps {
	conversationId: string;
}

const DoctorConversationInput = ({
	conversationId,
}: DoctorConversationInputProps) => {
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
		<div className=" py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						render={({ field }) => <FormItem></FormItem>}
						name="message"
					/>
				</form>
			</Form>
		</div>
	);
};

export default DoctorConversationInput;
