const { z } = require("zod");

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

module.exports = { signinSchema, signupSchema, courseSchema };
