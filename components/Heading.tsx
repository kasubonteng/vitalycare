import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
	text: string;
	subtext: string;
	icon: LucideIcon;
	iconColor: string;
	bgColor: string;
}

export const Heading = ({
	text,
	subtext,
	icon: Icon,
	iconColor,
	bgColor,
}: HeadingProps) => {
	return (
		<div className="flex justify-start ">
			<div className="flex p-4 mb-8 lg:px-8 gap-x-3">
				<div className={cn("p-2 w-fit rounded-md", bgColor)}>
					<Icon className={cn("w-10 h-10", iconColor)} />
				</div>
				<div>
					<h2 className="text-2xl font-bold md:text-3xl ">{text}</h2>
					<p className="text-sm text-muted-foreground">{subtext} </p>
				</div>
			</div>
		</div>
	);
};
