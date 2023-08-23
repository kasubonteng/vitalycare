import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	try {
		const { userId } = auth();

		const data = req.body;
		console.log(data);

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
	} catch (error) {
		console.log("HOSPITAL_ERROR: ", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
