"use client";

import { Booking, BookingSchema } from "@/lib/validators/bookingForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@tanstack/react-query";
import { prisma } from "@/lib/prisma";
import { currentUser, useUser } from "@clerk/nextjs";
import { UserDataContext } from "@/context/userData";

interface AppointmentFormProps {
	doctorId: string;
}

const AppointmentForm = ({ doctorId }: AppointmentFormProps) => {
	const [input, setInput] = useState<string>("");
	const [date, setDate] = useState<Date | undefined>(new Date());

	const form = useForm<z.infer<typeof BookingSchema>>({
		resolver: zodResolver(BookingSchema),
		defaultValues: {
			date: new Date(),
			reason: "",
		},
	});

	const { user: clerkUser } = useUser();

	const { mutate: submitBooking, isLoading } = useMutation({
		// mutationFn: async (data: Booking) => {
		// 	const user = await prisma.user.findFirst({
		// 		where: {
		// 			lastName: clerkUser?.lastName as string | undefined,
		// 		},
		// 	});
		// 	await prisma.booking.create({
		// 		data: {
		// 			date: data.date,
		// 			reason: data.reason,
		// 			doctorId: doctorId,
		// 			patientId: user?.id as string,
		// 		},
		// 	});
		// },
	});

	const onSubmit = (values: z.infer<typeof BookingSchema>) => {
		console.log(values);

		// TODO: SUBMIT FORM
		// submitBooking(values);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div>
					<div className="flex flex-col space-y-6 ">
						<div className="flex flex-col gap-2 ">
							<Label className="">Date of Appointment</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										className={cn(
											"justify-start font-normal text-left  w-80",
											!date && "text-muted-foreground"
										)}
										variant="outline"
									>
										<CalendarIcon className="w-4 h-4 mr-4 " />
										{date ? format(date, "PPP") : <span>Pick a date</span>}
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										initialFocus
										disabled={(date) => date < new Date()}
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div className="flex flex-col gap-2">
							<Label>Reason For Appointment</Label>
							<TextareaAutosize
								value={input}
								rows={6}
								className="rounded-lg resize-none border-muted-foreground focus:ring-black focus:outline-none"
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();

										// TODO: SUBMIT FORM
										// submitBooking({ date: date as Date, reason: input });
									}
								}}
							/>
						</div>

						<Button className="" variant="destructive">
							Book Appointment
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default AppointmentForm;
