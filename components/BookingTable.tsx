"use client";

import axios from "axios";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { Gender } from "@prisma/client";

interface BookingTableProps {
	bookings: {
		id: string;
		patientId: string;
		doctorId: string;
		date: Date;
		reason: string;
	}[];

	doctors: {
		id: string;
		name: string;
		gender: Gender;
		contact: string;
		image: string;
		specialty: string;
		isFavourite: boolean;
	}[];
}

const BookingTable = ({ bookings, doctors }: BookingTableProps) => {
	const removeBooking = (id: string) => {
		axios.delete("/api/book-appointment", {
			data: id,
		});
	};

	const doctor = doctors.map((doctor) => ({
		id: doctor.id,
		name: doctor.name,
	}));

	const getDoctorName = (id: string) => {
		const result = doctor.find(({ id }) => id === id);
		return result?.name;
	};

	console.log(doctor);

	return (
		<Table>
			<TableCaption>List of Your Appointments</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Doctor</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Reason</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{bookings.map((booking) => (
					<TableRow key={booking.id}>
						<TableCell>{getDoctorName(booking.id)}</TableCell>
						<TableCell>{booking.date.toDateString()}</TableCell>
						<TableCell>{booking.reason}</TableCell>
						<TableCell>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="destructive">Cancel Booking</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											You may not be able to make an appointment on this day
											anymore.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => removeBooking(booking.id)}
										>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default BookingTable;
