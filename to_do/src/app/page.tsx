"use client";
import { useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  return (
    <main className="space-y-6 font-sans">
      <h1 className="text-6xl font-bold py-6">Task Manager</h1>
      <TaskForm onCreated={() => setRefresh((r) => r + 1)} />
      <TaskList refresh={refresh} />
    </main>
  );
}
