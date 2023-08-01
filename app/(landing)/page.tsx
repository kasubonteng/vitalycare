"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Noto_Sans } from "next/font/google";
import TypewriterComponent from "typewriter-effect";
import { LandingNavbar } from "@/components/LandingNavbar";

const noto_sans = Noto_Sans({
	weight: "600",
	subsets: ["latin"],
	variable: "--font-noto-sans",
});

const LandingPage = () => {
	const isSignedIn = useAuth();
	return (
		<div className="max-h-screen ">
			<LandingNavbar />
			<div className="h-screen space-y-5 font-bold text-center text-white py-36">
				<div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
					<h1 className={noto_sans.className}>Welcome To Vitaly Care</h1>
					<div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-pink-900">
						<TypewriterComponent
							options={{
								strings: [
									"Chatbot",
									"Find Hospitals",
									"Find Doctors",
									"Book Appointments",
								],
								autoStart: true,
								loop: true,
							}}
						/>
					</div>
				</div>
				<div className="text-sm font-light text-white md:text-xl">
					All your healthcare needs in one place
				</div>
				<div>
					<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
						<Button
							variant="destructive"
							className="p-4 font-semibold rounded-full md:text-lg md:p-6"
						>
							Get Started
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
