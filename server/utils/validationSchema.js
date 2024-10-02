const { z } = require("zod");

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const emailOrPhoneSchema = z.union([
  z.string().email({ message: "Please enter a valid email-id/mobile number" }),
  z.string().regex(phoneRegex, {
    message: "Please enter a valid email-id/mobile number",
  }),
]);

const verifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(4),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
  firstName: z.string().min(2),
  lastName: z.string().optional(),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

const courseSchema = z.object({
  name: z.string().min(5).max(100),
  description: z.string(),
  price: z.number(),
});

module.exports = {
  signinSchema,
  signupSchema,
  courseSchema,
  emailOrPhoneSchema,
  verifyOTPSchema,
};
