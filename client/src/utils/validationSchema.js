import { z } from "zod";

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const emailOrPhoneSchema = z.union([
  z.string().email({ message: "Please enter a valid email-id/mobile number" }),
  z.string().regex(phoneRegex, {
    message: "Please enter a valid email-id/mobile number",
  }),
]);

const passwordSchema = z.string().min(8).max(50);

export { emailOrPhoneSchema, passwordSchema };
