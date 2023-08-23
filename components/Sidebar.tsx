import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
	CalendarClock,
	Church,
	LayoutDashboard,
	MessageSquare,
	Settings,
	Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const routes = [
	{
		name: "Dashboard",
		icon: LayoutDashboard,
		href: "/dashboard",
		color: "text-sky-500",
	},
	{
		name: "Chat",
		icon: MessageSquare,
		href: "/chat/stream",
		color: "text-green-500",
	},
	{
		name: "Hospitals",
		icon: Church,
		href: "/hospitals",
		color: "text-blue-900",
	},
	{
		name: "Doctors",
		icon: Stethoscope,
		href: "/doctors",
		color: "text-gray-700",
	},
	{
		name: "Bookings",
		icon: CalendarClock,
		href: "/bookings",
		color: "text-teal-400",
	},
	{
		name: "Settings",
		icon: Settings,
		href: "/settings",
	},
];

const Sidebar = () => {
	const pathname = usePathname();
	return (
		<div className="inset-y-0 z-[10000] flex flex-col h-full py-4 space-y-4 shadow-lg text-muted w-72 bg-destructive">
			<div className="flex-1 px-3 py-2 ">
				<Link href="/chat" className="flex items-center pl-3 mb-14 ">
					<div className="relative w-6 h-6 mr-2">
						<Image src="/logo.png" alt="logo" fill />
					</div>
					<h1 className="text-2xl font-medium md:text-2xl">Vitaly Care</h1>
				</Link>

				<div className="space-y-1 ">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								"flex items-center justify-start p-4 space-x-2 rounded-lg hover:bg-white/90 hover:text-black hover:shadow-lg transition text-sm font-medium w-full",
								pathname === route.href
									? " bg-white/90 text-black shadow-lg"
									: " text-muted"
							)}
						>
							<div className="flex items-center flex-1 ">
								<route.icon className={cn("w-5 h-5 mr-3", route.color)} />
								{route.name}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
