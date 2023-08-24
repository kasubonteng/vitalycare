"use client";

import { ArrowRight, Church, MessageSquare, Stethoscope } from "lucide-react";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
	{
		name: "Chat",
		icon: MessageSquare,
		href: "/chat/stream",
		color: "text-green-500",
		bgColor: "text-green-500/10",
	},
	{
		name: "Hospitals",
		icon: Church,
		href: "/hospitals",
		color: "text-blue-900",
		bgColor: "text-blue-900/10",
	},
	{
		name: "Doctors",
		icon: Stethoscope,
		href: "/doctors",
		color: "text-gray-700",
		bgColor: "text-gray-700/10",
	},
];

const DashboardCard = () => {
	const router = useRouter();
	return (
		<div className="flex flex-col px-4 space-y-4 md:px-20 lg:px-32">
			{links.map((link) => (
				<Card
					key={link.name}
					className="flex items-center justify-between p-4 transition cursor-pointer border-black/5 hover:shadow-md group"
					onClick={() => router.push(link.href)}
				>
					<div className="flex items-center gap-x-4">
						<div className={cn("p-2 w-fit", link.bgColor)}>
							<link.icon className={cn("w-8 h-8", link.color)} />
						</div>
						<div className="font-semibold ">{link.name}</div>
					</div>
					<ArrowRight className=" group-hover:scale-125" />
				</Card>
			))}
		</div>
	);
};

export default DashboardCard;
