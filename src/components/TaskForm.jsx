import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAddTask({
      id: "task-" + Date.now(),
      title: trimmed,
      priority: priority,
      column: "todo",
      createdAt: new Date().toISOString()
    });
    setTitle("");
  }

  return (
    <form className ="task-form" onSubmit ={handleSubmit}>
      <input
        type ="text"
        className ="input-text"
        placeholder ="Add a new task (e.g., Design authentication flow)..."
        value ={title}
        onChange ={(e) => setTitle(e.target.value)}
        required
      />
      <select
        className ="select-priority"
        value ={priority}
        onChange ={(e) => setPriority(e.target.value)}
      >
        <option value ="High">High Priority</option>
        <option value ="Medium">Medium Priority</option>
        <option value ="Low">Low Priority</option>
      </select>
      <button type ="submit" className ="btn-primary">
        + Add Task
      </button>
    </form>
  );
}
