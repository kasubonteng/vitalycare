"use client";

import { FullMessageType } from "@/app/(dashboard)/(routes)/doctors/conversations/[conversationId]/types";
import { cn } from "@/lib/utils";
import { auth, useAuth } from "@clerk/nextjs";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";

interface MessageBoxProps {
	data: FullMessageType;
	isLast?: boolean;
}

const DoctorMessageBox = ({ data, isLast }: MessageBoxProps) => {
	const { userId } = useAuth();

	const isOwn = userId === data.sender.userId;
	return (
		<div className={cn(" flex gap-3 p-4", isOwn && "justify-end")}>
			<div className={cn(isOwn && "order-2")}>
				<Avatar>
					<AvatarFallback>{data.sender.firstName.charAt(0)}</AvatarFallback>
				</Avatar>
			</div>
			<div className={cn(" flex flex-col gap-2", isOwn && "items-end")}>
				<div className="flex items-center gap-1 ">
					<div className="text-sm text-gray-500 ">{data.sender.firstName}</div>
					<div className="text-sm text-gray-400 ">
						{format(new Date(data.createdAt), "p")}
					</div>
				</div>
				<div
					className={cn(
						" text-sm w-fit overflow-hidden rounded-full py-2 px-3",
						isOwn ? "bg-destructive text-white" : "bg-gray-100"
					)}
				>
					{data.body}
				</div>
			</div>
		</div>
	);
};

export default DoctorMessageBox;
