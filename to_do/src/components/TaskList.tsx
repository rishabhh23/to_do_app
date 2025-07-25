"use client";
import { useEffect, useState } from "react";
import { api, API_BASE } from "@/lib/api";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function TaskList({ refresh }: { refresh: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({ status: "", title: "" });
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.title) params.append("title", filters.title);
      const json = await api(`/api/tasks?${params.toString()}`);
      setTasks(json.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [refresh]);

  async function remove(id: string) {
    await api(`/api/tasks/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className=" rounded-lg border-2 border-black p-2"
          placeholder="Filter title"
          value={filters.title}
          onChange={(e) => setFilters((f) => ({ ...f, title: e.target.value }))}
        />
        <select
          className="p-2 rounded-lg border-2 border-black"
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <button
          onClick={load}
          className="bg-gray-800 text-white px-3 rounded-lg text-sm px-10 hover:bg-gray-700 transition-colors"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-md text-gray-500">Loading…</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li key={t.id} className="border-2 border-black p-4 rounded-lg">
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <p className="font-bold text-2xl truncate">{t.title}</p>
                  <span className="text-sm px-2 py-1 rounded bg-gray-200">
                    {t.status}
                  </span>
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className="text-red-600 text-sm border-2 border-red-600 px-3 py-1 rounded hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>

              {/* Description row */}
              <p className="mt-3 text-md text-center break-words whitespace-pre-wrap max-h-32 overflow-y-auto px-2">
                {t.description}
              </p>
            </li>
          ))}
        </ul>
      )}

      <a
        href={`${API_BASE}/api/docs`}
        target="_blank"
        className="underline text-blue-600 text-lg"
      >
        Swagger Docs
      </a>
      <h2>© 2025 Rishabh Sharma</h2>
      <h2>rish23.tech@gmail.com</h2>
    </div>
  );
}
