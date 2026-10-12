function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add one above!</p>;
  }

  return (
    <div className="task-list">
      <h2>My Tasks</h2>

      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <div className="task-details">
            <h3 className={task.completed ? "completed" : ""}>
              {task.title}
            </h3>

            <p>{task.description || "No description"}</p>

            <span
              className={`status ${
                task.completed ? "done" : "pending"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="task-buttons">
            <button onClick={() => onToggleStatus(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => onEdit(task)}>
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;