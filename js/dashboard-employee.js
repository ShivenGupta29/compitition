// js/dashboard-employee.js
import { getTasks, addTask } from "./tasks.js";

document.addEventListener("DOMContentLoaded", () => {
  const quickAddInput = document.querySelector(".quick-add-input");
  const kanbanBoard = document.querySelector(".kanban-board");

  // Function to draw the tasks on the screen
  const renderBoard = () => {
    const tasks = getTasks();

    // Only get tasks that are Open or In Progress for this simple view
    const openTasks = tasks.filter((t) => t.status === "Open");
    const progressTasks = tasks.filter((t) => t.status === "In Progress");

    kanbanBoard.innerHTML = `
            <div class="kanban-column">
                <h3>Open (${openTasks.length})</h3>
                ${openTasks
                  .map(
                    (task) => `
                    <div class="task-card card" style="animation: fadeIn 0.3s ease;">
                        <h4>${task.title}</h4>
                        <span class="status-pill open">Open</span>
                    </div>
                `,
                  )
                  .join("")}
            </div>
            <div class="kanban-column">
                <h3>In Progress (${progressTasks.length})</h3>
                ${progressTasks
                  .map(
                    (task) => `
                    <div class="task-card card" style="animation: fadeIn 0.3s ease;">
                        <h4>${task.title}</h4>
                        <span class="status-pill progress">In Progress</span>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `;
  };

  // Listen for the "Enter" key on the Quick Add bar
  if (quickAddInput) {
    quickAddInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && quickAddInput.value.trim() !== "") {
        addTask(quickAddInput.value.trim(), "Employee");
        quickAddInput.value = ""; // clear input
        renderBoard(); // redraw board
      }
    });
  }

  // Instantly update if Admin adds a task in another tab!
  window.addEventListener("storage", (e) => {
    if (e.key === "lala_tasks") renderBoard();
  });

  // Initial draw
  renderBoard();
});
