"use client";

import { prisma } from "@/lib/prisma";
import { User } from "@/lib/validators/onboardingForm";
import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";

export const UserDataContext = createContext<{
	myUser: User;
	createNewUser: (data: User) => void;
	updateUser: (data: User) => void;
	updateFirstName: (newName: string) => void;
	updateLastName: (newName: string) => void;
	updateOtherNames: (newName: string) => void;
	updateAge: (newAge: number) => void;
	updateHeight: (newHeight: number) => void;
	updateWeight: (newWeight: number) => void;
	updateHealthCondition: (text: string) => void;
}>({
	myUser: {
		firstName: "",
		lastName: "",
		otherNames: "",
		age: 0,
		weight: 0,
		height: 0,
		healthConditions: "",
	},
	createNewUser: () => {},
	updateUser: () => {},
	updateFirstName: () => {},
	updateLastName: () => {},
	updateOtherNames: () => {},
	updateAge: () => {},
	updateHeight: () => {},
	updateWeight: () => {},
	updateHealthCondition: () => {},
});

export function UserDataProvider({ children }: { children: React.ReactNode }) {
	const [myUser, setMyUser] = useState<User>({
		firstName: "Kwadwo",
		lastName: "Asubonteng",
		otherNames: "Nketia",
		age: 27,
		weight: 75,
		height: 165,
		healthConditions: "No",
	});

	const createNewUser = async (data: User) => {
		// await prisma.user.create({
		// 	data: {
		// 		firstName: data.firstName,
		// 		lastName: data.lastName,
		// 		otherNames: data.otherNames,
		// 		age: data.age,
		// 		weight: data.weight,
		// 		height: data.height,
		// 		healthConditions: data.healthConditions,
		// 	},
		// });
	};

	const updateUser = (data: User) => {
		setMyUser(data);
	};

	const updateFirstName = (newName: string) => {
		setMyUser({ ...myUser, firstName: newName });
	};
	const updateLastName = (newName: string) => {
		setMyUser({ ...myUser, lastName: newName });
	};
	const updateAge = (newAge: number) => {
		setMyUser({ ...myUser, age: newAge });
	};
	const updateWeight = (newWeight: number) => {
		setMyUser({ ...myUser, weight: newWeight });
	};
	const updateOtherNames = (newName: string) => {
		setMyUser({ ...myUser, otherNames: newName });
	};
	const updateHeight = (newHeight: number) => {
		setMyUser({ ...myUser, height: newHeight });
	};
	const updateHealthCondition = (text: string) => {
		setMyUser({ ...myUser, healthConditions: text });
	};

	return (
		<UserDataContext.Provider
			value={{
				myUser,
				createNewUser,
				updateUser,
				updateFirstName,
				updateLastName,
				updateOtherNames,
				updateAge,
				updateHeight,
				updateWeight,
				updateHealthCondition,
			}}
		>
			{children}
		</UserDataContext.Provider>
	);
}
