// js/dashboard-admin.js
import { getTasks, addTask } from "./tasks.js";

document.addEventListener("DOMContentLoaded", () => {
  const quickAddInput = document.querySelector(".quick-add-input");
  const assigneeSelect = document.querySelector(".select-assignee");
  const statCards = document.querySelectorAll(".stat-number");

  // Function to calculate and update the 4 big numbers
  const renderStats = () => {
    const tasks = getTasks();

    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const done = tasks.filter((t) => t.status === "Done").length;
    // For demo, we'll pretend tasks older than 1 minute are overdue if not done
    const overdue = tasks.filter(
      (t) =>
        t.status !== "Done" &&
        Date.now() - new Date(t.createdAt).getTime() > 60000,
    ).length;

    // Update the HTML (assuming the order matches your HTML file)
    if (statCards.length >= 4) {
      statCards[0].innerText = total;
      statCards[1].innerText = inProgress;
      statCards[2].innerText = overdue;
      statCards[3].innerText = done;
    }
  };

  // Listen for the "Enter" key on the Quick Add bar
  if (quickAddInput) {
    quickAddInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && quickAddInput.value.trim() !== "") {
        const assignee = assigneeSelect ? assigneeSelect.value : "Unassigned";
        addTask(quickAddInput.value.trim(), assignee);
        quickAddInput.value = ""; // clear input
        renderStats(); // redraw stats
      }
    });
  }

  // Instantly update if Employee adds a task in another tab!
  window.addEventListener("storage", (e) => {
    if (e.key === "lala_tasks") renderStats();
  });

  // Initial draw
  renderStats();
});
