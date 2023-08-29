import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const getUsers = async () => {
	const { user } = auth();

	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}
	try {
		const users = await prisma.user.findMany();

		return users;
	} catch (error) {
		console.log("GET_USER_ERROR", error);
	}
};

export default getUsers;
