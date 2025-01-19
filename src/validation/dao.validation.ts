import { z } from "zod";

const dateSchema = z
  .union([
    z.date(), // Accepts Date objects
    z.string().refine((str) => !isNaN(Date.parse(str)), {
      message: "Invalid date string format",
    }),
  ])
  .transform((value) => {
    if (typeof value === "string") {
      return new Date(value); // Parse string into Date
    }
    return value;
  });

export const daoFormSchema = z.object({
  title: z
    .string()
    .min(2, "Fund name must be at least 2 characters")
    .max(50, "Fund name must be less than 50 characters"),
  fundTicker: z
    .string()
    .regex(
      /^[A-Z0-9]+$/,
      "Fund ticker must contain only uppercase letters and numbers"
    ),
  description: z
    .string()
    .min(10, "Fund description must be at least 10 characters")
    .max(500, "Fund description must be less than 500 characters"),
  telegramHandle: z
    .string()
    .regex(/^@?(\w){5,32}$/, "Invalid Telegram handle format")
    .or(z.literal("")),
    telegramGroup: z
    .string()
    .regex(/^@?(\w){5,32}$/, "Invalid Telegram group format")
    .optional()
    .or(z.literal("")),
    poc: z.string().min(1, "POC is required"),
    indexFund: z.number(),
    fundingStarts: dateSchema.optional().default(new Date()),
    poster: z.string(),
});

export const daoSchema = daoFormSchema.extend({
  id: z.string().cuid(),

  treasuryAddress: z.string(),
  daoCoinAddress: z.string(),
  twitterHandle: z
    .string()
    .regex(/^@?(\w){1,15}$/, "Invalid Twitter/X handle format")
    .or(z.literal("")),
  fundingEnds: dateSchema.optional(),

  tradingStartsAt: dateSchema.optional(),
  tradingEndsAt: dateSchema.optional(),

  createdAt: z.date().default(() => new Date()),
});

export type DaoFormData = z.infer<typeof daoFormSchema>;
export type DaoData = z.infer<typeof daoSchema>;

export const DAODataSchema = daoSchema;
