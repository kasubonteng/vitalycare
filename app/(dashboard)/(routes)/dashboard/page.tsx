"use client";

import { Heading } from "@/components/Heading";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	ArrowRight,
	Church,
	DatabaseIcon,
	LayoutDashboard,
	MessageSquare,
	Stethoscope,
} from "lucide-react";
import { useRouter } from "next/navigation";

const links = [
	{
		name: "Chat",
		icon: MessageSquare,
		href: "/chat",
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

const DashboardPage = () => {
	const router = useRouter();
	return (
		<div className="">
			<div className="flex px-2 mb-8 md:px-16 lg:px-28">
				<Heading
					text="Welcome to Vitaly Care"
					subtext="All your healthcare needs in one place"
					icon={LayoutDashboard}
					iconColor="text-blue-500"
					bgColor="bg-blue-500/10"
				/>
			</div>

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
		</div>
	);
};

export default DashboardPage;
