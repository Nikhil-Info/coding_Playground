
// Your Firebase config (from Project Settings)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login
document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(error => alert("Login failed: " + error.message));
});

// Registration
document.getElementById("register").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Save user's name (optional)
      return userCredential.user.updateProfile({ displayName: name });
    })
    .then(() => window.location.href = "dashboard.html")
    .catch(error => alert("Registration failed: " + error.message));
});

// Logout (add to dashboard.js)
document.getElementById("logout").addEventListener("click", () => {
  auth.signOut().then(() => window.location.href = "index.html");
});