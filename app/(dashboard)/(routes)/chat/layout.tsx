import { Heading } from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Heading
				text="Chat"
				subtext="Have any health related questions? Ask Vitaly Bot"
				icon={MessageSquare}
				iconColor="text-green-500"
				bgColor="bg-green-500/10"
			/>
			{children}
		</>
	);
};

//  flex flex-col justify-between min-h-[46rem] p-4

export default Layout;
