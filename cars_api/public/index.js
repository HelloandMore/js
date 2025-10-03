const API_BASE = '/cars';

// Load cars when page loads
document.addEventListener('DOMContentLoaded', loadCars);

// Add car form submission
document.getElementById('addCarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    
    try {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brand, model })
        });
        
        if (response.ok) {
            document.getElementById('addCarForm').reset();
            loadCars();
        } else {
            alert('Error adding car');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Edit car form submission
document.getElementById('editCarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const brand = document.getElementById('editBrand').value;
    const model = document.getElementById('editModel').value;
    
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brand, model })
        });
        
        if (response.ok) {
            cancelEdit();
            loadCars();
        } else {
            alert('Error updating car');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

async function loadCars() {
    try {
        const response = await fetch(API_BASE);
        const cars = await response.json();
        displayCars(cars);
    } catch (error) {
        console.error('Error loading cars:', error);
    }
}

function displayCars(cars) {
    const carsList = document.getElementById('carsList');
    carsList.innerHTML = '';
    
    cars.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.className = 'car-item';
        carDiv.innerHTML = `
            <strong>ID:</strong> ${car.id} | 
            <strong>Brand:</strong> ${car.brand} | 
            <strong>Model:</strong> ${car.model}
            <button class="edit-btn" onclick="editCar(${car.id}, '${car.brand}', '${car.model}')">Edit</button>
            <button class="delete-btn" onclick="deleteCar(${car.id})">Delete</button>
        `;
        carsList.appendChild(carDiv);
    });
}

function editCar(id, brand, model) {
    document.getElementById('editId').value = id;
    document.getElementById('editBrand').value = brand;
    document.getElementById('editModel').value = model;
    document.getElementById('editForm').style.display = 'block';
}

function cancelEdit() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('editCarForm').reset();
}

async function deleteCar(id) {
    if (confirm('Are you sure you want to delete this car?')) {
        try {
            const response = await fetch(`${API_BASE}/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadCars();
            } else {
                alert('Error deleting car');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}
