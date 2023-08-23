"use client";

import { Heading } from "@/components/Heading";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CogIcon, Lock, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

const links = [
	{
		name: "Account",
		icon: User,
		href: "/account",
	},
	{
		name: "Privacy and Security",
		icon: Lock,
		href: "/privacy",
	},
];

const SettingsPage = () => {
	const router = useRouter();

	return (
		<div className="p-2 ">
			<div className="flex ">
				<Heading
					text="Settings"
					subtext="Edit your settings"
					icon={Settings}
					bgColor="bg-black/10"
					iconColor="text-black"
				/>
			</div>

			<div className="flex flex-col items-center justify-center space-y-6 ">
				{links.map((link) => (
					<Card
						key={link.href}
						onClick={() => router.push(`/settings${link.href}`)}
						className="w-4/5 transition border-0 border-b-2 rounded-none border-black/20 group hover:border-destructive hover:text-destructive "
					>
						<CardHeader className="flex flex-row justify-between p-5 m-0">
							<CardTitle className="flex space-x-6 text-md">
								<div>
									<link.icon className="transition group-hover:scale-125 " />
								</div>
								<div>{link.name}</div>
							</CardTitle>
							<ArrowRight className=" group-hover:scale-125" />
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
};

export default SettingsPage;
