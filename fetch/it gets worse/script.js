function displayCourses() {
    // Use fetch to get the list of courses from the API
    fetch('https://vvri.pythonanywhere.com/api/courses')
        .then(response => response.json())
        .then(data => {
            // Display the courses on the web page
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayStudents() {
    // Use fetch to get the list of students from the API
    fetch('https://vvri.pythonanywhere.com/api/students')
        .then(response => response.json())
        .then(data => {
            // Display the students on the web page
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createCourse() {
    // Implement the logic to create a new course using the API
}

function createStudent() {
    // Implement the logic to create a new student using the API
}

function editCourse() {
    // Implement the logic to edit an existing course using the API
}

function editStudent() {
    // Implement the logic to edit an existing student using the API
}

function deleteCourse() {
    // Implement the logic to delete an existing course using the API
}

function deleteStudent() {
    // Implement the logic to delete an existing student using the API
}