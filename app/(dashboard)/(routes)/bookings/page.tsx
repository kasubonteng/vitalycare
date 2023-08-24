import BookingTable from "@/components/BookingTable";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const BookingsPage = async () => {
	const { userId } = auth();

	const bookings = await prisma.booking.findMany({
		where: {
			patientId: userId as string,
		},
	});

	const doctors = await prisma.doctor.findMany();

	return (
		<div>
			<BookingTable bookings={bookings} doctors={doctors} />
		</div>
	);
};

export default BookingsPage;
