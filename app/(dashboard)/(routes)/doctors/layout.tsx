import { Heading } from "@/components/Heading";
import { Stethoscope } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Heading
				text="Doctors"
				subtext="Find doctors and specialists to contact"
				bgColor="bg-black/10"
				icon={Stethoscope}
				iconColor="text-black"
			/>
			{children}
		</>
	);
};

export default Layout;
