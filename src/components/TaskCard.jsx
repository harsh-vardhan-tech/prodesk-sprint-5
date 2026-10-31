import { useState, useRef, useEffect } from "react";

export default function TaskCard({ task, onDeleteTask, onMoveTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function handleSaveEdit() {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.title) {
      onEditTask(task.id, trimmed);
    } else {
      setEditText(task.title);
    }
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditText(task.title);
      setIsEditing(false);
    }
  }

  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  const priority = task?.priority || "Medium";
  const priorityClass = "priority-" + priority.toLowerCase();
  const tagClass = "tag-" + priority.toLowerCase();

  return (
    <div
      className ={`task-card ${priorityClass} ${isDragging ? "dragging" : ""}`}
      draggable ={!isEditing}
      onDragStart ={handleDragStart}
      onDragEnd ={handleDragEnd}
    >
      <div className ="task-header">
        <span className ={`priority-tag ${tagClass}`}>{task.priority}</span>
        <div className ="card-actions-top">
          <button
            type ="button"
            className ="btn-icon"
            title ="Edit task title"
            onClick ={() => setIsEditing(true)}
          >
            ✎
          </button>
          <button
            type ="button"
            className ="btn-icon btn-delete"
            title ="Delete task"
            onClick ={() => onDeleteTask(task.id)}
          >
            &times;
          </button>
        </div>
      </div>

      {isEditing ? (
        <input
          ref ={inputRef}
          type ="text"
          className ="inline-edit-input"
          value ={editText}
          onChange ={(e) => setEditText(e.target.value)}
          onBlur ={handleSaveEdit}
          onKeyDown ={handleKeyDown}
        />
      ) : (
        <div
          className ="task-body"
          title ="Double-click to edit"
          onDoubleClick ={() => setIsEditing(true)}
        >
          {task.title}
        </div>
      )}

      <div className ="task-footer">
        <div className ="move-btn-group">
          {task.column === "inProgress" && (
            <button
              type ="button"
              className ="btn-move"
              title ="Move to To Do"
              onClick ={() => onMoveTask(task.id, "todo")}
            >
              &larr; To Do
            </button>
          )}
          {task.column === "done" && (
            <button
              type ="button"
              className ="btn-move"
              title ="Move back to In Progress"
              onClick ={() => onMoveTask(task.id, "inProgress")}
            >
              &larr; In Progress
            </button>
          )}
          {task.column === "todo" && (
            <button
              type ="button"
              className ="btn-move"
              title ="Move to In Progress"
              onClick ={() => onMoveTask(task.id, "inProgress")}
            >
              In Progress &rarr;
            </button>
          )}
          {task.column === "inProgress" && (
            <button
              type ="button"
              className ="btn-move"
              title ="Move to Done"
              onClick ={() => onMoveTask(task.id, "done")}
            >
              Done &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
