import { Task } from "../models/task";

const tasks: Task[] = []; // In-memory store

export const taskRepository = {
  getAll: () => tasks,
  findById: (id: string) => tasks.find((t) => t.id === id),
  create: (task: Task) => {
    tasks.push(task);
    return task;
  },
  update: (id: string, updater: (task: Task) => void) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    updater(task);
    return task;
  },
  delete: (id: string) => {
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    return true;
  },
};
