interface Hospital {
	name: string;
	location: string;
	image: string;
	type: "Private" | "Public" | "Specialist";
	avg_waiting_time: number;
	working_hours: string;
	contact: number | string;
	isFavourite: boolean;
	services: string;
}

interface Doctor {
	id: string;
	hospitalId?: string;
	name: string;
	gender: "Male" | "Female";
	image: string;
	contact: number | string;
	specialty: string;
	isFavourite: boolean;
}
