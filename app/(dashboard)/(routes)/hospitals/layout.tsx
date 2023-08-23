import { Heading } from "@/components/Heading";
import { Church } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Heading
				text="Hospitals"
				subtext="Find hospitals near you"
				bgColor="bg-blue-500/10"
				iconColor="text-blue-500"
				icon={Church}
			/>
			{children}
		</>
	);
};

export default Layout;
