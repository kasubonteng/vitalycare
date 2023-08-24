import DashboardCard from "@/components/DashboardCard";
import { Heading } from "@/components/Heading";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";

const DashboardPage = async () => {
	const { userId } = auth();

	const user = await prisma.user.findUnique({
		where: {
			userId: userId as string,
		},
	});
	return (
		<div className="">
			<div className="flex px-2 mb-8 md:px-16 lg:px-28">
				<Heading
					text={`${user?.firstName}, Welcome to Vitaly Care`}
					subtext="All your healthcare needs in one place"
					icon={LayoutDashboard}
					iconColor="text-blue-500"
					bgColor="bg-blue-500/10"
				/>
			</div>

			<DashboardCard />
		</div>
	);
};

export default DashboardPage;
