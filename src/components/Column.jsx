import { useState } from "react";
import TaskCard from "./TaskCard";

export default function Column({
  column,
  tasks,
  onDeleteTask,
  onMoveTask,
  onEditTask,
  onDropTask
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) setIsDragOver(true);
  }

  function handleDragLeave(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onDropTask(taskId, column.id);
    }
  }

  return (
    <div
      className ={`kanban-column ${isDragOver ? "drag-over" : ""}`}
      onDragOver ={handleDragOver}
      onDragLeave ={handleDragLeave}
      onDrop ={handleDrop}
    >
      <div className ="column-header">
        <div className ="column-title-wrap">
          <span className ={`column-indicator indicator-${column.id}`}></span>
          <h2>{column.title}</h2>
        </div>
        <span className ="column-badge">{tasks.length}</span>
      </div>

      <div className ="task-list">
        {tasks.length === 0 ? (
          <div className ="empty-column">No tasks here</div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key ={task.id}
              task ={task}
              onDeleteTask ={onDeleteTask}
              onMoveTask ={onMoveTask}
              onEditTask ={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
