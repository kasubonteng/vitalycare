"use client";

import { cn } from "@/lib/utils";
import { BookingSchema } from "@/lib/validators/bookingForm";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ToastAction } from "./ui/toast";
import { toast } from "./ui/use-toast";

interface AppointmentFormProps {
	doctorId: string;
}

const AppointmentForm = ({ doctorId }: AppointmentFormProps) => {
	const [input, setInput] = useState<string>("");
	const [date, setDate] = useState<Date | undefined>(new Date());
	const router = useRouter();
	const { user } = useUser();

	const form = useForm<z.infer<typeof BookingSchema>>({
		resolver: zodResolver(BookingSchema),
		defaultValues: {
			date: new Date(),
			reason: "",
		},
	});

	const {
		errors,
		isSubmitSuccessful: isSuccess,
		isSubmitting: isLoading,
	} = form.formState;

	useEffect(() => {
		if (isSuccess) {
			toast({
				title: "Appointment Made",
				action: (
					<ToastAction
						altText="See Bookings"
						onClick={() => router.push("/bookings")}
					>
						See Bookings
					</ToastAction>
				),
			});
		}
	}, [router, isSuccess]);

	// const onSubmit = async (values: z.infer<typeof BookingSchema>) => {
	// 	console.log({ ...values, patientId: user?.id, doctorId });

	// 	axios.post("/api/book-appointment", {
	// 		appointmentDetails: {
	// 			...values,
	// 			patientId: user?.id,
	// 			doctorId: doctorId,
	// 		},
	// 	});

	// 	if (isSuccess) {
	// 		form.reset();
	// 	}
	// };

	const onSubmit = () => {
		router.push("/connect-metamask");
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div>
					<div className="flex flex-col space-y-6 ">
						<div className="flex flex-col gap-2 ">
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem className="flex flex-col ">
										<FormLabel>Date of Appointment</FormLabel>
										<FormControl>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														className={cn(
															"justify-start font-normal text-left  w-80",
															!date && "text-muted-foreground"
														)}
														variant="outline"
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="w-4 h-4 ml-auto " />
													</Button>
												</PopoverTrigger>
												<PopoverContent>
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														initialFocus
														disabled={(date) => date < new Date()}
													/>
												</PopoverContent>
											</Popover>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<FormField
								control={form.control}
								name="reason"
								render={({ field }) => (
									<FormItem className="flex flex-col ">
										<FormLabel>Reason For Appointment</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="rounded-lg resize-none border-muted-foreground focus:ring-black focus:outline-none"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<Button
							type="submit"
							variant="destructive"
							disabled={isLoading}
							onClick={() => console.log(isSuccess)}
						>
							{isLoading ? "Booking" : "Book"} Appointment
							{isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : ""}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default AppointmentForm;
