import { Heading } from "@/components/Heading";
import { Church } from "lucide-react";
import HospitalCard from "@/components/HospitalCard";
import { PrismaClient } from "@prisma/client";

const HospitalsPage = async () => {
	const prisma = new PrismaClient();

	const hospitals = await prisma.hospital.findMany();

	return (
		<div className="p-2 ">
			<div className="flex ">
				<Heading
					text="Hospitals"
					subtext="Find hospitals near you"
					bgColor="bg-blue-500/10"
					iconColor="text-blue-500"
					icon={Church}
				/>
			</div>
			<div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
				{hospitals.map((hospital) => (
					<div className="" key={hospital.name}>
						<HospitalCard
							name={hospital.name}
							avg_waiting_time={hospital.avg_waiting_time}
							contact={hospital.contact}
							image={hospital.image}
							location={hospital.location}
							type={hospital.type}
							working_hours={hospital.working_hours}
							isFavourite={hospital.isFavourite}
							services={hospital.services}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default HospitalsPage;
