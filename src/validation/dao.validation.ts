import { AVAILABLE_PERIOD_OF_TRADING } from "@/constants";
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
  slug: z.string().min(3).max(60, "Slug max word limit is 40"),
  walletAddress: z.string(),
  title: z
    .string()
    .min(2, "Fund name must be at least 2 characters")
    .max(60, "Fund name must be less than 60 characters"),
  description: z
    .string()
    .min(10, "Fund description must be at least 10 characters")
    .max(500, "Fund description must be less than 500 characters"),
  fundTicker: z
    .string()
    .regex(
      /^[A-Z0-9]+$/,
      "Fund ticker must contain only uppercase letters and numbers"
    ),
  indexFund: z
    .union([
      z
        .string()
        .regex(/^\d+$/, "Must be a valid number")
        .transform((val) => Number(val)),
      z.number(),
    ])
    .refine((val) => val > 0, "Index fund must be greater than 0"),
  profits: z.number().min(0).max(10, "Profits must be between 0 and 10"),

  userXHandle: z.string(),
  daoXHandle: z
    .string()
    // .regex(/^@?(\w){1,15}$/, "Invalid Twitter/X handle format")
    .or(z.literal("")),
  telegramHandle: z
    .string()
    .regex(/^@?(\w){5,32}$/, "Invalid Telegram handle format")
    .or(z.literal("")),
  telegramGroup: z
    .string()
    .regex(/^@?(\w){5,32}$/, "Invalid Telegram group format")
    .optional()
    .or(z.literal("")),
  website: z.string().url().optional().default(""),

  fundingStarts: dateSchema.optional().default(new Date()),
  tradingPeriod: z
    .number()
    .optional()
    .nullable()
    .refine((val) => !val || AVAILABLE_PERIOD_OF_TRADING.includes(val), {
      message: "Invalid trading period",
    }),

  poster: z.string().url().optional(),
});

export type DaoFormData = z.infer<typeof daoFormSchema>;

export const daoSchema = daoFormSchema.extend({
  id: z.string().cuid(),
  treasuryAddress: z.string(),
  daoCoinAddress: z.string(),

  createdAt: z.date().default(() => new Date()),
});

export type DaoData = z.infer<typeof daoSchema>;
export const DAODataSchema = daoSchema;
