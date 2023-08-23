"use client";

import OnboardingForm from "@/components/OnboardingForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const OnboardingPage = () => {
	return (
		<div className="flex items-center justify-center w-full h-screen ">
			<Card className="w-3/5 p-6 shadow-2xl shadow-destructive">
				<CardHeader>
					<CardTitle>🎉 Welcome to Vitaly Care</CardTitle>
					<CardDescription className="text-sm text-muted-foreground">
						Please Provide Some General Information About Yourself
					</CardDescription>
				</CardHeader>
				<CardContent>
					<OnboardingForm />
				</CardContent>
			</Card>
		</div>
	);
};

export default OnboardingPage;
