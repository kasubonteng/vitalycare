import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Church, Heart, Phone, User2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DoctorCard = ({
	name,
	image,
	specialty,
	hospital,
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

					<h2 className="mt-3 text-lg font-light leading-8 lg:text-2xl lg:leading-9 lg:mt-5">
						{name}
					</h2>
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
			</CardHeader>
		</Card>
	);
};

export default DoctorCard;
