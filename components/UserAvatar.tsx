"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { AvatarImage } from "@radix-ui/react-avatar";

export const UserAvatar = () => {
	const { user } = useUser();

	return (
		<Avatar className="w-8 h-8">
			<AvatarImage src={user?.profileImageUrl} />
			<AvatarFallback>
				{user?.firstName?.charAt(0)}
				{user?.lastName?.charAt(0)}
			</AvatarFallback>
		</Avatar>
	);
};
