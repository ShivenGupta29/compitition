// Wait for the document to fully load
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  // Only run this if we are actually on the login page
  if (loginBtn) {
    loginBtn.addEventListener("click", function (event) {
      // Stop the form from submitting and refreshing the page
      event.preventDefault();

      // Trigger the demo prompt you asked for
      let userChoice = prompt(
        "DEMO MODE: Do you want to login as 'admin' or 'employee'?",
      );

      // Clean up the text (remove spaces, make lowercase)
      if (userChoice) {
        userChoice = userChoice.trim().toLowerCase();
      }

      // Redirect based on the answer
      if (userChoice === "admin") {
        window.location.href = "admin.html";
      } else if (userChoice === "employee") {
        window.location.href = "employee.html";
      } else {
        alert("Invalid choice. Please type 'admin' or 'employee'.");
      }
    });
  }
});
