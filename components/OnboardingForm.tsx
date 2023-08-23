"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast, useToast } from "./ui/use-toast";
import { OnboardingSchema } from "@/lib/validators/onboardingForm";
import { useContext } from "react";
import { UserDataContext } from "@/context/userData";
import { useRouter } from "next/navigation";

type formInputType = {
	label: string;
	placeholder: string;
	control:
		| "firstName"
		| "lastName"
		| "otherNames"
		| "age"
		| "weight"
		| "height"
		| "healthConditions";
	inputType: "text" | "number";
}[];

// TODO : ADD GENDER TO FORM

const formInputs: formInputType = [
	{
		label: "First Name",
		control: "firstName",
		placeholder: "Enter your first name",
		inputType: "text",
	},
	{
		label: "Last Name",
		control: "lastName",
		placeholder: "Enter your last name",
		inputType: "text",
	},
	{
		label: "Other Names",
		control: "otherNames",
		placeholder: "Enter any other names",
		inputType: "text",
	},
	{
		label: "Age",
		control: "age",
		placeholder: "Enter your age",
		inputType: "number",
	},
	{
		label: "Weight",
		control: "weight",
		placeholder: "Enter your weight in kilograms (kg)",
		inputType: "number",
	},
	{
		label: "Height",
		control: "height",
		placeholder: "Enter your height in centimeters (cm)",
		inputType: "number",
	},
	{
		label: "Health Conditions",
		control: "healthConditions",
		placeholder: "Do you have any health conditions?",
		inputType: "text",
	},
];

const OnboardingForm = () => {
	const router = useRouter();
	const { createNewUser } = useContext(UserDataContext);

	const form = useForm<z.infer<typeof OnboardingSchema>>({
		resolver: zodResolver(OnboardingSchema),
		defaultValues: {
			firstName: "Kwadwo",
			lastName: "Asubonteng",
			otherNames: "Nketia",
			age: 27,
			height: 165,
			weight: 75,
			healthConditions: "No",
		},
	});

	const {
		errors,
		isSubmitting: isLoading,
		isSubmitSuccessful: isSuccess,
	} = form.formState;
	// console.log(errors);

	const onSubmit = (values: z.infer<typeof OnboardingSchema>) => {
		createNewUser(values);
		console.log(isLoading);
		console.log(isSuccess);

		if (isSuccess) {
			form.reset();
			router.push("/dashboard");
		}
	};

	const { toast } = useToast();
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{formInputs.map((formItem) => (
					<FormField
						key={formItem.label}
						control={form.control}
						name={formItem.control}
						render={({ field }) => (
							<FormItem className="p-1">
								<FormLabel className="p-0 m-0 text-xs">
									{formItem.label}
								</FormLabel>
								<FormControl className="m-0 ">
									<Input
										{...field}
										placeholder={formItem.placeholder}
										type={formItem.inputType}
										className="m-0 "
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				))}
				<div className="pt-6 ">
					<Button type="submit" className=" bg-destructive">
						Register{" "}
						{isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : ""}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default OnboardingForm;
