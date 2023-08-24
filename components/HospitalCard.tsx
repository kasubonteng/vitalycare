"use client";

import { cn } from "@/lib/utils";
import {
	Clock10,
	Heart,
	MapPin,
	Maximize2,
	Phone,
	Timer,
	Unlink2,
} from "lucide-react";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

const HospitalCard = ({
	name,
	location,
	image,
	avg_waiting_time,
	contact,
	type,
	working_hours,
	isFavourite,
}: Hospital) => {
	const toggleFavourite = () => {
		// TODO
	};
	return (
		<Card>
			<CardHeader>
				<div className="relative w-auto rounded-full h-44">
					<Image src={image} alt="Hospital Image" fill />
				</div>
				<CardTitle className="mt-3 text-lg font-light leading-8 py-7 lg:text-2xl lg:leading-9 lg:mt-5">
					{name}
				</CardTitle>
				<div className="flex flex-col space-y-5 ">
					<div className="flex items-center justify-start space-x-4">
						<MapPin size={20} />
						<CardDescription className="text-xs">{location}</CardDescription>
					</div>
					<div className="flex items-center justify-start space-x-4 ">
						<Phone size={16} />
						<CardDescription className="text-xs ">{contact}</CardDescription>
					</div>
					<div className="flex items-center justify-start space-x-4 ">
						<Clock10 size={16} />
						<CardDescription className="text-xs ">
							{working_hours}
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Dialog>
					<DialogTrigger className="text-sm transition hover:text-destructive group ">
						<div className="flex items-center ">
							More Info
							<Maximize2
								size={14}
								className="ml-1 transition group-hover:scale-125"
							/>
						</div>
					</DialogTrigger>
					<DialogContent className="p-8">
						<DialogHeader>
							<DialogTitle>
								<div className="relative w-auto h-72 ">
									<Image fill src={image} alt="Hospital Image" />
								</div>
							</DialogTitle>
							<DialogTitle className="flex justify-between py-4 mt-3 text-2xl font-light leading-8 lg:text-2xl lg:leading-9 lg:mt-5">
								{name}{" "}
								<div>
									<Heart
										onClick={() => console.log(toggleFavourite)}
										className={cn(
											"hover:cursor-pointer hover:scale-110",
											isFavourite
												? "text-destructive hover:text-primary"
												: "hover:text-destructive"
										)}
									/>
								</div>
							</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col gap-6">
							<div className="flex mt-4 space-x-4">
								<MapPin />
								<DialogDescription>{location}</DialogDescription>
							</div>
							<div className="flex space-x-4">
								<Phone />
								<DialogDescription>{contact}</DialogDescription>
							</div>
							<div className="flex space-x-4">
								<Clock10 />
								<DialogDescription>{working_hours}</DialogDescription>
							</div>
							<div className="flex space-x-4">
								<Timer />
								<DialogDescription>
									{avg_waiting_time} hrs average waiting time
								</DialogDescription>
							</div>
							<div className="flex space-x-4">
								<Unlink2 />
								<DialogDescription>{type} hospital</DialogDescription>
							</div>
							{/* <div className="flex space-x-4">
								<Cross />
								<DialogDescription>Services Offered:</DialogDescription>
								{services.map((service) => (
									<DialogDescription key={service.name}>
										{service.name}
									</DialogDescription>
								))}
							</div> */}
						</div>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
};

export default HospitalCard;
