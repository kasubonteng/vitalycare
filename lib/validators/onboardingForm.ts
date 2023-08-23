import { z } from "zod";

export const OnboardingSchema = z.object({
	firstName: z.string().min(1, {
		message: "First Name cannot be empty",
	}),
	lastName: z.string().min(2, {
		message: "Last Name must be at least 2 characters",
	}),
	otherNames: z.string().optional(),
	age: z.coerce
		.number({
			required_error: "Age is required",
			invalid_type_error: "Age must be a number",
		})
		.gte(1, {
			message: "Age must be a number",
		}),
	weight: z.coerce
		.number({
			required_error: "Weight is required",
			invalid_type_error: "Weight must be a number",
		})
		.gte(1, {
			message: "Weight must be a number",
		}),
	height: z.coerce
		.number({
			required_error: "Height is required",
			invalid_type_error: "Height must be a number",
		})
		.gte(1, {
			message: "Height must be a number",
		}),
	healthConditions: z.string().optional(),
});

export type User = z.infer<typeof OnboardingSchema>;
