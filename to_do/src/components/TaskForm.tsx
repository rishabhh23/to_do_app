"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export function TaskForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await api("/api/tasks", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ title: "", description: "", status: "PENDING" });
      onCreated();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErr(err.message);
      } else {
        setErr("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="border-3 px-10 py-4 rounded-lg">
      <h2 className="font-semibold text-3xl">Create Task</h2>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <input
        className="border p-2 w-full rounded-lg"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        required
      />
      <textarea
        className="border p-2 w-full rounded-lg"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm((f) => ({ ...f, description: e.target.value }))
        }
        required
      />
      <select
        className="border p-2 w-full rounded-lg"
        value={form.status}
        onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
      >
        <option value="PENDING">PENDING</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>
      <button
        disabled={loading}
        className="bg-[#90e0ef] text-black px-10 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-[#48cae4] transition-colors"
      >
        {loading ? "Saving…" : "Add"}
      </button>
    </form>
  );
}
