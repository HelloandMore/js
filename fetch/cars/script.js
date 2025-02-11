// Function to get all cars
async function getCars() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// Function to get a car by id
async function getCarById(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// Function to create a new car
async function createCar(carData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(carData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// Function to update a car by id
async function updateCar(id, carData) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(carData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// Function to delete a car by id
async function deleteCar(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
        await response.json();
        return 'Successfully deleted';
    } catch (error) {
        console.error('Error occurred:', error);
    }
}