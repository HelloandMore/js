const API_URL = "http://localhost:3000";
let token = null;

// Handle Registration
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      alert("Registration successful!");
    } else {
      alert("Registration failed.");
    }
  });

// Handle Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    token = data.token;
    alert("Login successful!");
    showProfile();
    fetchPosts();
  } else {
    alert("Login failed.");
  }
});

// Show Profile
async function showProfile() {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const user = await response.json();
    document.getElementById(
      "profileInfo"
    ).innerText = `Name: ${user.name}, Email: ${user.email}`;
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("createPostForm").style.display = "block";
    document.getElementById("postsSection").style.display = "block";
  } else {
    alert("Failed to fetch profile.");
  }
}

// Handle Logout
document.getElementById("logoutButton").addEventListener("click", () => {
  token = null;
  document.getElementById("profileSection").style.display = "none";
  document.getElementById("createPostForm").style.display = "none";
  document.getElementById("postsSection").style.display = "none";
});

// Handle Create Post
document
  .getElementById("createPostForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      alert("Post created!");
      fetchPosts();
    } else {
      alert("Failed to create post.");
    }
  });

// Fetch Posts
async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const posts = await response.json();
    const postsList = document.getElementById("postsList");
    postsList.innerHTML = "";
    posts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.className = "post";
      postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
      postsList.appendChild(postDiv);
    });
  } else {
    alert("Failed to fetch posts.");
  }
}
