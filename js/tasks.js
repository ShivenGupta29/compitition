// js/tasks.js

// Load tasks from browser storage, or return an empty array if none exist
export const getTasks = () => {
  const tasks = localStorage.getItem("lala_tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Save tasks to browser storage
export const saveTasks = (tasks) => {
  localStorage.setItem("lala_tasks", JSON.stringify(tasks));
};

// Create a new task
export const addTask = (title, assignee) => {
  const tasks = getTasks();
  const newTask = {
    id: Date.now().toString(),
    title: title,
    assignee: assignee || "Unassigned",
    status: "Open", // Default status
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

// Update task status (for drag-and-drop or clicking)
export const updateTaskStatus = (id, newStatus) => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex > -1) {
    tasks[taskIndex].status = newStatus;
    saveTasks(tasks);
  }
};
