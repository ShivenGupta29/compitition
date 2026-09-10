import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const loginBtn = document.getElementById("login-btn");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginBtn.disabled = true;
    loginBtn.textContent = "Signing in...";
    errorMessage.className = "error-hidden";

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value,
      );
      await routeUser(userCredential.user.uid);
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.className = "error-visible";
      loginBtn.disabled = false;
      loginBtn.textContent = "Sign in";
    }
  });
}

async function routeUser(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const role = userDoc.data().role;
      if (role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "employee.html";
      }
    } else {
      throw new Error("User record not found in database.");
    }
  } catch (error) {
    if (errorMessage) {
      errorMessage.textContent = error.message;
      errorMessage.className = "error-visible";
      loginBtn.disabled = false;
      loginBtn.textContent = "Sign in";
    }
  }
}

onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname;
  if (user) {
    if (
      currentPage.endsWith("index.html") ||
      currentPage === "/" ||
      currentPage === ""
    ) {
      routeUser(user.uid);
    }
  } else {
    if (
      !currentPage.endsWith("index.html") &&
      currentPage !== "/" &&
      currentPage !== ""
    ) {
      window.location.href = "index.html";
    }
  }
});
