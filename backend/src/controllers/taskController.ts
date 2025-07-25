import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { taskRepository } from "../repository/taskRepository";
import {
  createTaskSchema,
  updateTaskSchema,
  querySchema,
} from "../validation/taskValidation";

export const createTask = (req: Request, res: Response) => {
  try {
    const data = createTaskSchema.parse(req.body);
    const now = new Date().toISOString();
    const task = taskRepository.create({
      id: uuid(),
      title: data.title,
      description: data.description,
      status: data.status ?? "PENDING",
      createdAt: now,
      updatedAt: now,
    });
    res.status(201).json(task);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Invalid body";
    res.status(400).json({ error: msg });
  }
};

export const getTasks = (req: Request, res: Response) => {
  try {
    // Parse numeric + status pagination fields
    const { page, pageSize, status } = querySchema.parse(req.query);

    // --- Single proper fix: safely extract "title" from req.query ---
    const rawTitle = req.query.title;
    let title: string | undefined;
    if (typeof rawTitle === "string") {
      title = rawTitle.trim().toLowerCase();
    } else if (Array.isArray(rawTitle) && typeof rawTitle[0] === "string") {
      title = rawTitle[0].trim().toLowerCase();
    }
    // ----------------------------------------------------------------

    let all = taskRepository.getAll();
    if (status) all = all.filter((t) => t.status === status);
    if (title && title.length > 0) {
      all = all.filter((t) => t.title.toLowerCase().includes(title!));
    }

    const total = all.length;
    const start = (page - 1) * pageSize;
    const paged = all.slice(start, start + pageSize);

    res.json({
      data: paged,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Invalid query";
    res.status(400).json({ error: msg });
  }
};

export const getTaskById = (req: Request, res: Response) => {
  const task = taskRepository.findById(req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });
  res.json(task);
};

export const updateTask = (req: Request, res: Response) => {
  try {
    const data = updateTaskSchema.parse(req.body);
    const updated = taskRepository.update(req.params.id, (t) => {
      if (data.title !== undefined) t.title = data.title;
      if (data.description !== undefined) t.description = data.description;
      if (data.status !== undefined) t.status = data.status;
      t.updatedAt = new Date().toISOString();
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Invalid body";
    res.status(400).json({ error: msg });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  const ok = taskRepository.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
};
