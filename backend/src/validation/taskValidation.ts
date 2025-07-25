import { z } from "zod";

export const statusEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().min(1, "Description required"),
  status: statusEnum.optional().default("PENDING"),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: statusEnum.optional(),
});

export const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  status: statusEnum.optional(),
  title: z.preprocess((v) => {
    if (Array.isArray(v)) v = v[0]; // take first if array
    return typeof v === "string" ? v : undefined;
  }, z.string().optional()),
});
