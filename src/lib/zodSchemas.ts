import { z } from "zod";
import { stateList } from "./data";

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
    .refine((value) => /^(?:\d{10})?$/.test(value), {
      message: "Invalid phone number format. Please enter a 10-digit number.",
    })
    .optional(),
});
export const ZodAddressSchema = z.object({
  is_default: z.boolean(),
  name: z
    .string()
    .min(5, "Fullname must be 5 or more characters long")
    .max(20, "Fullname must be less than 20 characters long"),
  phone: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Invalid phone number format. Please enter a 10-digit number.",
  }),
  address: z
    .string()
    .min(3, "Address must be 3 or more characters long")
    .max(100, "Address must be less than 100 characters long"),
  pincode: z.string().refine((value) => /^\d{6}$/.test(value), {
    message: "Invalid PIN code. Please enter a 6-digit number.",
  }),
  locality: z
    .string()
    .min(3, "Locality name must be 3 or more characters long")
    .max(30, "Locality name must be less than 30 characters long"),
  district: z
    .string()
    .min(3, "District name must be 3 or more characters long")
    .max(30, "District name must be less than 30 characters long"),
  state: z.string().refine((value) => stateList.includes(value), {
    message: "Invalid state name. Please select a valid state.",
  }),
  landmark: z.string().optional(),
  alternate_phone: z
    .string()
    .refine((value) => /^(?:\d{10})?$/.test(value), {
      message: "Invalid phone number format. Please enter a 10-digit number.",
    })
    .optional(),
});
