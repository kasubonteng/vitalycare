import DoctorCard from "@/components/DoctorCard";
import { Heading } from "@/components/Heading";
import { Stethoscope } from "lucide-react";
import { DoctorData } from "./DoctorData";
import { PrismaClient } from "@prisma/client";

const DoctorsPage = async () => {
	const prisma = new PrismaClient();

	const doctorData = await prisma.doctor.findMany();

	return (
		<div className="p-2 ">
			<div className="flex ">
				<Heading
					text="Doctors"
					subtext="Find doctors and specialists to contact"
					bgColor="bg-black/10"
					icon={Stethoscope}
					iconColor="text-black"
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
				{doctorData.map((doctor) => (
					<DoctorCard
						name={doctor.name}
						contact={doctor.contact}
						gender={doctor.gender}
						image={doctor.image}
						specialty={doctor.specialty}
						key={doctor.name}
						isFavourite={doctor.isFavourite}
					/>
				))}
			</div>
		</div>
	);
};

export default DoctorsPage;
