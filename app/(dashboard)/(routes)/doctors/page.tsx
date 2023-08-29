import DoctorCard from "@/components/DoctorCard";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const DoctorPage = async () => {
	const doctors = await prisma.doctor.findMany();

	return (
		<div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			{doctors.map((doctor) => (
				<div key={doctor.id}>
					<DoctorCard
						id={doctor.id}
						name={doctor.name}
						contact={doctor.contact}
						gender={doctor.gender}
						image={doctor.image}
						isFavourite={doctor.isFavourite}
						specialty={doctor.specialty}
						hospitalId={doctor.id}
					/>
				</div>
			))}
		</div>
	);
};

export default DoctorPage;
