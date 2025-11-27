const API_URL = "http://localhost:5000/api";
let token = localStorage.getItem("token");
let currentWorkoutId = null;
let exerciseCounter = 0;

if (token) {
  showMainApp();
  loadWorkouts();
} else {
  document.getElementById("loginPage").classList.remove("hidden");
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      token = data.token;
      localStorage.setItem("token", token);
      showMainApp();
      loadWorkouts();
    } else {
      showError("loginError", data.error);
    }
  } catch (error) {
    showError("loginError", "Connection error");
  }
});

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        token = data.token;
        localStorage.setItem("token", token);
        showMainApp();
        loadWorkouts();
      } else {
        showError("registerError", data.error);
      }
    } catch (error) {
      showError("registerError", "Connection error");
    }
  });

function switchToRegister() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.remove("hidden");
}

function switchToLogin() {
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}

function logout() {
  token = null;
  localStorage.removeItem("token");
  document.getElementById("mainApp").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}

function showMainApp() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
}

function showError(elementId, message) {
  const errorEl = document.getElementById(elementId);
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
  setTimeout(() => errorEl.classList.add("hidden"), 5000);
}

function showWorkouts() {
  document.getElementById("workoutsPage").classList.remove("hidden");
  document.getElementById("statisticsPage").classList.add("hidden");
  document.getElementById("workoutsTab").classList.add("active");
  document.getElementById("statsTab").classList.remove("active");
  loadWorkouts();
}

function showStatistics() {
  document.getElementById("workoutsPage").classList.add("hidden");
  document.getElementById("statisticsPage").classList.remove("hidden");
  document.getElementById("workoutsTab").classList.remove("active");
  document.getElementById("statsTab").classList.add("active");
  loadStatistics();
}

async function loadWorkouts() {
  try {
    const response = await fetch(`${API_URL}/workouts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const workouts = await response.json();
    displayWorkouts(workouts);
  } catch (error) {
    console.error("Error loading workouts:", error);
  }
}

function displayWorkouts(workouts) {
  const container = document.getElementById("workoutsList");

  if (workouts.length === 0) {
    container.innerHTML =
      '<div class="empty-state"><h3>No workouts yet</h3><p>Start by adding your first workout!</p></div>';
    return;
  }

  container.innerHTML = workouts
    .map(
      (workout) => `
                <div class="workout-card">
                    <h3>${new Date(workout.date).toLocaleDateString()}</h3>
                    <div class="workout-info">
                        <span>⏱️ ${workout.duration} minutes</span>
                        <span>💪 ${
                          workout.exercises?.length || 0
                        } exercises</span>
                    </div>
                    ${
                      workout.notes
                        ? `<p style="color: #666; margin-bottom: 10px;">${workout.notes}</p>`
                        : ""
                    }
                    ${
                      workout.exercises?.length > 0
                        ? `
                        <div class="exercise-list">
                            ${workout.exercises
                              .map(
                                (ex) => `
                                <div class="exercise-item">
                                    <span><strong>${ex.name}</strong></span>
                                    <span>${ex.sets} sets × ${ex.reps} reps @ ${ex.weight}kg</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    `
                        : ""
                    }
                    <div class="workout-actions">
                        <button class="btn btn-small" onclick="editWorkout(${
                          workout.id
                        })">Edit</button>
                        <button class="btn btn-small btn-danger" onclick="deleteWorkout(${
                          workout.id
                        })">Delete</button>
                    </div>
                </div>
            `
    )
    .join("");
}

function openAddWorkoutModal() {
  currentWorkoutId = null;
  document.getElementById("modalTitle").textContent = "Add Workout";
  document.getElementById("workoutForm").reset();
  document.getElementById("workoutDate").valueAsDate = new Date();
  document.getElementById("exercisesContainer").innerHTML = "";
  addExerciseInput();
  document.getElementById("workoutModal").classList.add("show");
}

function closeWorkoutModal() {
  document.getElementById("workoutModal").classList.remove("show");
}

async function editWorkout(id) {
  try {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const workout = await response.json();
    currentWorkoutId = id;
    document.getElementById("modalTitle").textContent = "Edit Workout";
    document.getElementById("workoutDate").value = workout.date;
    document.getElementById("workoutDuration").value = workout.duration;
    document.getElementById("workoutNotes").value = workout.notes || "";

    document.getElementById("exercisesContainer").innerHTML = "";
    if (workout.exercises && workout.exercises.length > 0) {
      workout.exercises.forEach((ex) => {
        addExerciseInput(ex);
      });
    } else {
      addExerciseInput();
    }

    document.getElementById("workoutModal").classList.add("show");
  } catch (error) {
    console.error("Error loading workout:", error);
  }
}

async function deleteWorkout(id) {
  if (!confirm("Are you sure you want to delete this workout?")) return;

  try {
    await fetch(`${API_URL}/workouts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadWorkouts();
  } catch (error) {
    console.error("Error deleting workout:", error);
  }
}

function addExerciseInput(exercise = null) {
  exerciseCounter++;
  const container = document.getElementById("exercisesContainer");
  const div = document.createElement("div");
  div.className = "exercise-input";
  div.innerHTML = `
                <div class="exercise-input-row">
                    <input type="text" placeholder="Exercise name" class="exercise-name" value="${
                      exercise?.name || ""
                    }" required>
                    <input type="number" placeholder="Sets" class="exercise-sets" value="${
                      exercise?.sets || ""
                    }" min="1" required>
                    <input type="number" placeholder="Reps" class="exercise-reps" value="${
                      exercise?.reps || ""
                    }" min="1" required>
                    <input type="number" placeholder="Weight (kg)" class="exercise-weight" value="${
                      exercise?.weight || ""
                    }" step="0.5" min="0" required>
                    <button type="button" class="btn btn-small btn-danger" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
            `;
  container.appendChild(div);
}

document.getElementById("workoutForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = document.getElementById("workoutDate").value;
  const duration = parseInt(document.getElementById("workoutDuration").value);
  const notes = document.getElementById("workoutNotes").value;

  const exerciseInputs = document.querySelectorAll(".exercise-input");
  const exercises = Array.from(exerciseInputs).map((input) => ({
    name: input.querySelector(".exercise-name").value,
    sets: parseInt(input.querySelector(".exercise-sets").value),
    reps: parseInt(input.querySelector(".exercise-reps").value),
    weight: parseFloat(input.querySelector(".exercise-weight").value),
  }));

  const workoutData = { date, duration, notes, exercises };

  try {
    const url = currentWorkoutId
      ? `${API_URL}/workouts/${currentWorkoutId}`
      : `${API_URL}/workouts`;

    const response = await fetch(url, {
      method: currentWorkoutId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workoutData),
    });

    if (response.ok) {
      closeWorkoutModal();
      loadWorkouts();
    }
  } catch (error) {
    console.error("Error saving workout:", error);
  }
});

async function loadStatistics() {
  try {
    const response = await fetch(`${API_URL}/statistics`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const stats = await response.json();
    displayStatistics(stats);
  } catch (error) {
    console.error("Error loading statistics:", error);
  }
}

function displayStatistics(stats) {
  document.getElementById("totalWorkouts").textContent = stats.totalWorkouts;
  document.getElementById("totalDuration").textContent = stats.totalDuration;

  const chartContainer = document.getElementById("weeklyChart");

  if (stats.weeklyStats.length === 0) {
    chartContainer.innerHTML =
      '<p style="color: #666; text-align: center;">No workout data for the past 7 days</p>';
    return;
  }

  const maxDuration = Math.max(...stats.weeklyStats.map((s) => s.duration));

  chartContainer.innerHTML = stats.weeklyStats
    .map((stat) => {
      const percentage = (stat.duration / maxDuration) * 100;
      const date = new Date(stat.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      return `
                    <div class="chart-bar">
                        <div class="chart-label">${date}</div>
                        <div class="chart-value" style="width: ${percentage}%">${stat.duration} min</div>
                    </div>
                `;
    })
    .join("");
}
