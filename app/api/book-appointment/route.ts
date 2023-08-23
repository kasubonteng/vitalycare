import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { userId } = auth();

	const body = await req.json();
	const { appointmentDetails } = body;

	try {
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		await prisma.booking.create({
			data: {
				...appointmentDetails,
			},
		});

		return new NextResponse("Appointment Created", { status: 201 });
	} catch (error) {
		console.log("APPOINTMENT_ERROR", error);
	}
}
