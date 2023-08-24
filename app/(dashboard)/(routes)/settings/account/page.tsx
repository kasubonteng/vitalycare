"use client";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserDataContext } from "@/context/userData";
import { OnboardingSchema } from "@/lib/validators/onboardingForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, User as UserIcon } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type formInputType = {
	label: string;
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

const formInputs: formInputType = [
	{
		label: "First Name",
		control: "firstName",
		inputType: "text",
	},
	{
		label: "Last Name",
		control: "lastName",
		inputType: "text",
	},
	{
		label: "Other Names",
		control: "otherNames",
		inputType: "text",
	},
	{
		label: "Age",
		control: "age",
		inputType: "number",
	},
	{
		label: "Weight",
		control: "weight",
		inputType: "number",
	},
	{
		label: "Height",
		control: "height",
		inputType: "number",
	},
	{
		label: "Health Conditions",
		control: "healthConditions",
		inputType: "text",
	},
];

const AccountsPage = () => {
	const { myUser, updateUser } = useContext(UserDataContext);

	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const form = useForm<z.infer<typeof OnboardingSchema>>({
		resolver: zodResolver(OnboardingSchema),
		defaultValues: {
			firstName: myUser.firstName,
			lastName: myUser.lastName,
			age: myUser.age,
			otherNames: myUser.otherNames,
			height: myUser.height,
			weight: myUser.weight,
			healthConditions: myUser.healthConditions,
		},
	});

	const { isSubmitting: isLoading, isSubmitSuccessful: isSuccess } =
		form.formState;

	// useEffect(() => {
	//   if (isSuccess) {
	//     form.
	//   }

	// }, [isSuccess])

	const onSubmit = (values: z.infer<typeof OnboardingSchema>) => {
		if (!isUpdating) {
			setIsUpdating(!isUpdating);
		} else {
			updateUser(values);
			setIsUpdating(false);
			console.log(myUser);
		}
	};

	return (
		<div className="p-2 ">
			<div className="flex ">
				<Heading
					text="Account"
					subtext="View Your Account Details"
					icon={UserIcon}
					bgColor="bg-black/10"
					iconColor="text-black"
				/>
			</div>

			<div className="px-12 ">
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
												disabled={!isUpdating}
												type={formItem.inputType}
												className="disabled:text-black disabled:bg-slate-300"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						))}
						<div className="pt-6 ">
							<Button type="submit" variant="destructive">
								{isUpdating ? "Save" : "Edit"}
								{isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : ""}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default AccountsPage;
