const API_URL = "http://localhost:3311/api/products";

let editMode = false;
let editingProductId = null;

// Load products when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  const form = document.getElementById("product-form");
  const cancelBtn = document.getElementById("cancel-btn");

  form.addEventListener("submit", handleFormSubmit);
  cancelBtn.addEventListener("click", cancelEdit);
}

// Load all products
async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Hiba a termékek betöltésekor:", error);
    alert("Nem sikerült betölteni a termékeket!");
  }
}

// Display products in the list
function displayProducts(products) {
  const productsList = document.getElementById("products-list");

  if (products.length === 0) {
    productsList.innerHTML = '<p class="no-products">Nincsenek termékek.</p>';
    return;
  }

  productsList.innerHTML = products
    .map(
      (product) => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p><strong>Ár:</strong> ${product.price} Ft</p>
                <p><strong>Mennyiség:</strong> ${product.amount} db</p>
                <p><strong>ID:</strong> ${product.id}</p>
            </div>
            <div class="product-actions">
                <button class="btn btn-edit" onclick="editProduct(${product.id})">Szerkesztés</button>
                <button class="btn btn-delete" onclick="deleteProduct(${product.id})">Törlés</button>
            </div>
        </div>
    `
    )
    .join("");
}

// Handle form submission (Add or Update)
async function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("product-name").value;
  const price = parseFloat(document.getElementById("product-price").value);
  const amount = parseInt(document.getElementById("product-amount").value);

  const productData = { name, price, amount };

  try {
    if (editMode) {
      await updateProduct(editingProductId, productData);
    } else {
      await addProduct(productData);
    }
  } catch (error) {
    console.error("Hiba a művelet során:", error);
    alert("Hiba történt a művelet során!");
  }
}

// Add new product
async function addProduct(productData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      alert("Termék sikeresen hozzáadva!");
      resetForm();
      loadProducts();
    } else {
      const error = await response.json();
      alert("Hiba: " + (error.error || "Nem sikerült hozzáadni a terméket"));
    }
  } catch (error) {
    console.error("Hiba a termék hozzáadásakor:", error);
    throw error;
  }
}

// Edit product - load data into form
async function editProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();

    if (response.ok) {
      editMode = true;
      editingProductId = id;

      document.getElementById("product-id").value = product.id;
      document.getElementById("product-name").value = product.name;
      document.getElementById("product-price").value = product.price;
      document.getElementById("product-amount").value = product.amount;

      document.getElementById("form-title").textContent = "Termék szerkesztése";
      document.getElementById("submit-btn").textContent = "Mentés";
      document.getElementById("cancel-btn").style.display = "inline-block";

      // Scroll to form
      document
        .querySelector(".form-section")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Nem sikerült betölteni a terméket!");
    }
  } catch (error) {
    console.error("Hiba a termék betöltésekor:", error);
    alert("Hiba történt a termék betöltésekor!");
  }
}

// Update product
async function updateProduct(id, productData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      alert("Termék sikeresen frissítve!");
      resetForm();
      loadProducts();
    } else {
      const error = await response.json();
      alert("Hiba: " + (error.error || "Nem sikerült frissíteni a terméket"));
    }
  } catch (error) {
    console.error("Hiba a termék frissítésekor:", error);
    throw error;
  }
}

// Delete product
async function deleteProduct(id) {
  if (!confirm("Biztosan törölni szeretnéd ezt a terméket?")) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Termék sikeresen törölve!");
      loadProducts();

      // If we're editing this product, cancel edit mode
      if (editMode && editingProductId === id) {
        resetForm();
      }
    } else {
      const error = await response.json();
      alert("Hiba: " + (error.error || "Nem sikerült törölni a terméket"));
    }
  } catch (error) {
    console.error("Hiba a termék törlésekor:", error);
    alert("Hiba történt a termék törlésekor!");
  }
}

// Cancel edit mode
function cancelEdit() {
  resetForm();
}

// Reset form to add mode
function resetForm() {
  editMode = false;
  editingProductId = null;

  document.getElementById("product-form").reset();
  document.getElementById("product-id").value = "";
  document.getElementById("form-title").textContent = "Új termék hozzáadása";
  document.getElementById("submit-btn").textContent = "Hozzáadás";
  document.getElementById("cancel-btn").style.display = "none";
}
