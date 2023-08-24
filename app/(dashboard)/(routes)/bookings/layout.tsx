import { Heading } from "@/components/Heading";
import { CalendarClock } from "lucide-react";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Heading
				text="Bookings"
				subtext="Find or make bookings with a medical professional"
				bgColor="bg-teal-400/10"
				iconColor="text-teal-400"
				icon={CalendarClock}
			/>
			{children}
		</>
	);
};

export default Layout;
