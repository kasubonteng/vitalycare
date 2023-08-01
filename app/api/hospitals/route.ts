import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	try {
		const { userId } = auth();

		const data = req.body;
		console.log(data);

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// await prisma.hospital.createMany({
		// 	data: data.
		// });
	} catch (error) {
		console.log("HOSPITAL_ERROR: ", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
