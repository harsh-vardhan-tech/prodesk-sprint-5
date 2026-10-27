import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import Column from "./components/Column";

const STORAGE_KEY = "prodesk_kanban_tasks";

const DEFAULT_TASKS = [
  { id: "task-1", title: "Review Sprint 05 React architecture requirements", priority: "High", column: "todo" },
  { id: "task-2", title: "Setup Vite React template and configure .gitignore", priority: "Medium", column: "inProgress" },
  { id: "task-3", title: "Implement 3-column Kanban layout with responsive grid", priority: "High", column: "inProgress" },
  { id: "task-4", title: "Architect useState and prop drilling between components", priority: "Medium", column: "done" },
  { id: "task-5", title: "Add localStorage state persistence across page refreshes", priority: "Low", column: "todo" },
  { id: "task-6", title: "Configure HTML5 drag-and-drop between state columns", priority: "High", column: "todo" }
];

const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" }
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      return DEFAULT_TASKS;
    }
    return DEFAULT_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  function handleAddTask(newTask) {
    setTasks((prev) => [newTask, ...prev]);
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleMoveTask(id, targetColumn) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, column: targetColumn } : t))
    );
  }

  function handleEditTask(id, newTitle) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  }

  function handleDropTask(id, targetColumn) {
    handleMoveTask(id, targetColumn);
  }

  function handleResetBoard() {
    setTasks(DEFAULT_TASKS);
    setSearchQuery("");
    setPriorityFilter("All");
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const todoCount = tasks.filter((t) => t.column === "todo").length;
  const inProgressCount = tasks.filter((t) => t.column === "inProgress").length;
  const doneCount = tasks.filter((t) => t.column === "done").length;

  return (
    <div className ="app-container">
      <header className ="header">
        <div className ="header-title">
          <h1>Kanban Task Board</h1>
          <p>Trello-style Task Management Board built with React &amp; Vite</p>
        </div>
        <div className ="header-stats">
          <div className ="stat-pill">Total: <strong>{tasks.length}</strong></div>
          <div className ="stat-pill">To Do: <strong>{todoCount}</strong></div>
          <div className ="stat-pill">In Progress: <strong>{inProgressCount}</strong></div>
          <div className ="stat-pill">Done: <strong>{doneCount}</strong></div>
        </div>
      </header>

      <div className ="controls-card">
        <TaskForm onAddTask ={handleAddTask} />
        <TaskFilters
          searchQuery ={searchQuery}
          setSearchQuery ={setSearchQuery}
          priorityFilter ={priorityFilter}
          setPriorityFilter ={setPriorityFilter}
          onResetBoard ={handleResetBoard}
        />
      </div>

      <main className ="kanban-grid">
        {COLUMNS.map((column) => (
          <Column
            key ={column.id}
            column ={column}
            tasks ={filteredTasks.filter((t) => t.column === column.id)}
            onDeleteTask ={handleDeleteTask}
            onMoveTask ={handleMoveTask}
            onEditTask ={handleEditTask}
            onDropTask ={handleDropTask}
          />
        ))}
      </main>

      <footer className ="footer">
        <p>Made by Harsh Vardhan</p>
      </footer>
    </div>
  );
}
