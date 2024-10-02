import { z } from "zod";

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const emailOrPhoneSchema = z.union([
  z.string().email({ message: "Please enter a valid email-id/mobile number" }),
  z
    .string()
    .regex(phoneRegex, {
      message: "Please enter a valid email-id/mobile number",
    }),
]);

export { emailOrPhoneSchema };
