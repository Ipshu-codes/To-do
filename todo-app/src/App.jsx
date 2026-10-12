
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  function handleSaveTask(formData) {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...formData }
            : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          completed: false,
        },
      ]);
    }
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  }

  function handleToggleStatus(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <main className="retro-page">
      <section className="browser-window">
        <div className="browser-top">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="browser-toolbar">
          <span className="nav-symbol">‹</span>
          <span className="nav-symbol">›</span>

          <div className="address-bar">
            <span className="search-icon">⌕</span>
            <div className="address-space"></div>
          </div>

          <button
            className="refresh-button"
            onClick={() => window.location.reload()}
            aria-label="Refresh page"
          >
            ⟳
          </button>
        </div>

        <div className="browser-content">
          <h1 className="retro-title">✣TO-DO LIST✣</h1>

          <div className="workspace">
            <TaskForm
              editingTask={editingTask}
              onSave={handleSaveTask}
              onCancel={() => setEditingTask(null)}
            />

            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          </div>
        </div>
      </section>

      <div className="corner-decoration" aria-hidden="true">
        <span>↗</span>
        <span>⌕</span>
      </div>
    </main>
  );
}

export default App;