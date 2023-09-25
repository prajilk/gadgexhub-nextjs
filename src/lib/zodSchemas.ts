import { z } from "zod";

export const ZodAuthSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
});
export const ZodProfileSchema = z.object({
  name: z
    .string()
    .min(5, "Fullname must be 5 or more characters long")
    .max(20, "Fullname must be less than 20 characters long"),
  gender: z.string().optional(),
  phone: z
    .string()
    .refine((value) => /^\d{10}$/.test(value), {
      message: "Invalid phone number format. Please enter a 10-digit number.",
    })
    .optional(),
});
