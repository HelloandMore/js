// API Base URL
const API_BASE_URL = "http://localhost:3000";

// DOM Elements
const userForm = document.getElementById("userForm");
const userNameInput = document.getElementById("userName");
const usersList = document.getElementById("usersList");
const refreshBtn = document.getElementById("refreshBtn");
const loadingSpinner = document.getElementById("loadingSpinner");
const toast = document.getElementById("toast");

// Edit Modal Elements
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editUserIdInput = document.getElementById("editUserId");
const editUserNameInput = document.getElementById("editUserName");
const closeModalBtn = document.querySelector(".close");
const cancelEditBtn = document.getElementById("cancelEdit");

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  userForm.addEventListener("submit", handleAddUser);
  refreshBtn.addEventListener("click", loadUsers);
  editForm.addEventListener("submit", handleEditUser);
  closeModalBtn.addEventListener("click", closeEditModal);
  cancelEditBtn.addEventListener("click", closeEditModal);

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === editModal) {
      closeEditModal();
    }
  });
}

// Show loading spinner
function showLoading() {
  loadingSpinner.style.display = "block";
}

// Hide loading spinner
function hideLoading() {
  loadingSpinner.style.display = "none";
}

// Show toast notification
function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add("show");

  // Add icon based on type
  const icon =
    type === "success"
      ? "fas fa-check-circle"
      : type === "error"
      ? "fas fa-exclamation-circle"
      : "fas fa-info-circle";
  toast.innerHTML = `<i class="${icon}"></i> ${message}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Load users from API
async function loadUsers() {
  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error("Error loading users:", error);
    showToast(
      "Failed to load users. Please check if the server is running.",
      "error"
    );
    displayEmptyState();
  } finally {
    hideLoading();
  }
}

// Display users in the UI
function displayUsers(users) {
  if (users.length === 0) {
    displayEmptyState();
    return;
  }

  usersList.innerHTML = users
    .map(
      (user) => `
        <div class="user-item fade-in">
            <div class="user-info">
                <div class="user-avatar">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <div class="user-details">
                    <h3>${escapeHtml(user.name)}</h3>
                    <div class="user-id">ID: ${user.id}</div>
                </div>
            </div>
            <div class="user-actions">
                <button class="btn-edit" onclick="openEditModal(${
                  user.id
                }, '${escapeHtml(user.name)}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-danger" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// Display empty state
function displayEmptyState() {
  usersList.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-users"></i>
            <h3>No users found</h3>
            <p>Add your first user using the form above.</p>
        </div>
    `;
}

// Handle add user form submission
async function handleAddUser(e) {
  e.preventDefault();

  const name = userNameInput.value.trim();
  if (!name) {
    showToast("Please enter a name", "warning");
    return;
  }

  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add user");
    }

    const newUser = await response.json();
    showToast(`User "${newUser.name}" added successfully!`);
    userNameInput.value = "";
    loadUsers();
  } catch (error) {
    console.error("Error adding user:", error);
    showToast(error.message || "Failed to add user", "error");
  } finally {
    hideLoading();
  }
}

// Open edit modal
function openEditModal(userId, userName) {
  editUserIdInput.value = userId;
  editUserNameInput.value = userName;
  editModal.style.display = "block";
  editUserNameInput.focus();
}

// Close edit modal
function closeEditModal() {
  editModal.style.display = "none";
  editForm.reset();
}

// Handle edit user form submission
async function handleEditUser(e) {
  e.preventDefault();

  const userId = editUserIdInput.value;
  const name = editUserNameInput.value.trim();

  if (!name) {
    showToast("Please enter a name", "warning");
    return;
  }

  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user");
    }

    const updatedUser = await response.json();
    showToast(`User updated successfully!`);
    closeEditModal();
    loadUsers();
  } catch (error) {
    console.error("Error updating user:", error);
    showToast(error.message || "Failed to update user", "error");
  } finally {
    hideLoading();
  }
}

// Delete user
async function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user?")) {
    return;
  }

  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user");
    }

    showToast("User deleted successfully!");
    loadUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
    showToast(error.message || "Failed to delete user", "error");
  } finally {
    hideLoading();
  }
}

// Utility function to escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Add some keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // ESC to close modal
  if (e.key === "Escape" && editModal.style.display === "block") {
    closeEditModal();
  }

  // Ctrl+R to refresh (prevent default and use our function)
  if (e.ctrlKey && e.key === "r") {
    e.preventDefault();
    loadUsers();
  }
});

// Add focus to name input when page loads
window.addEventListener("load", () => {
  userNameInput.focus();
});
