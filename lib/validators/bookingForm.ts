import { z } from "zod";

export const BookingSchema = z.object({
	date: z.date(),
	reason: z.string(),
});

export type Booking = z.infer<typeof BookingSchema>;
// Date time office reason name
