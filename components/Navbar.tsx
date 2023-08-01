"use client";

import MobileSidebar from "@/components/MobileSidebar";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const router = useRouter();
	return (
		<div className="flex items-center p-4 bg-rose-600 md:bg-transparent">
			<MobileSidebar />

			<div className="flex justify-start ml-4 space-x-4 ">
				<ArrowLeft
					onClick={() => router.back()}
					className="transition cursor-pointer hover:scale-125 hover:text-destructive"
				/>
				<ArrowRight
					onClick={() => router.forward()}
					className="transition cursor-pointer hover:scale-125 hover:text-destructive"
				/>
			</div>
			<div className="flex justify-end w-full ">
				<UserButton />
			</div>
		</div>
	);
};

export default Navbar;
