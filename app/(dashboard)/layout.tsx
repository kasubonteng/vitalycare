"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="relative h-full ">
			<div className="hidden md:h-full md:flex md:bg-rose-500 md:flex-col md:w-72 md:fixed md:inset-y-0">
				<Sidebar />
			</div>
			<main className=" md:pl-72">
				<Navbar />
				{children}
			</main>
		</div>
	);
};

export default DashboardLayout;
