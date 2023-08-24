"use client";

import { cn } from "@/lib/utils";
import { Church, Heart, Phone, User2 } from "lucide-react";
import Image from "next/image";
import AppointmentForm from "./AppointmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

const DoctorCard = ({
	id,
	name,
	image,
	specialty,
	// hospital,
	contact,
	gender,
	isFavourite,
}: Doctor) => {
	return (
		<Card className="p-0 m-0">
			<CardHeader>
				<CardTitle className="">
					<div className="relative w-full h-56">
						<Image src={image} alt={`${name} image`} fill />
					</div>

					<div className="mt-3 text-lg font-light leading-8 lg:text-2xl lg:leading-9 lg:mt-5">
						{name}
					</div>
					<div className="flex items-center justify-between mt-2 lg:mt-4">
						<span className="px-2 py-1 text-xs font-semibold leading-4 text-black rounded bg-black/10 lg:py-2 lg:px-6 lg:text-base lg:leading-7">
							{" "}
							{specialty}
						</span>

						<div>
							<Heart
								className={cn(
									"cursor-pointer",
									isFavourite
										? "text-destructive hover:text-primary"
										: "hover:text-destructive"
								)}
							/>
						</div>
					</div>
				</CardTitle>
				<CardContent className="flex items-start justify-between mt-4 lg:mt-5">
					<div className="flex flex-col gap-3 mt-3 text-xs text-muted-foreground">
						<div className="flex items-center space-x-4 leading-7 lg:leading-8">
							<User2 size={18} />
							<div>{gender}</div>
						</div>
						<div className="flex items-center space-x-4 leading-7 lg:leading-8">
							<Phone size={18} />
							<div>{contact}</div>
						</div>
						<div className="flex items-center space-x-4 leading-7 lg:leading-8">
							<Church size={18} />
							<div>{"Tech Hospital"}</div>
						</div>
					</div>
				</CardContent>
				<CardContent>
					<Dialog>
						<DialogTrigger>
							<div className="p-3 text-sm text-white rounded-md bg-destructive hover:bg-destructive/90">
								Book Appointment
							</div>
						</DialogTrigger>

						<DialogContent>
							<DialogHeader>
								<DialogTitle className="pb-2 text-2xl font-semibold">
									Book Appointment With {name}
								</DialogTitle>
							</DialogHeader>

							<AppointmentForm doctorId={id} />
						</DialogContent>
					</Dialog>
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export default DoctorCard;
