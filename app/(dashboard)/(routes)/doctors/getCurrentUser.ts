import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const getCurrentUser = async () => {
	try {
		const { userId } = auth();

		if (!userId) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				userId: userId,
			},
		});

		if (!currentUser) {
			return null;
		}

		return currentUser;
	} catch (error: any) {
		return null;
	}
};

export default getCurrentUser;
