// GET metódus
function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(json => {
            let li = `<tr><th>Name</th><th>Email</th></tr>`;
            json.forEach(user => {
                li += `<tr>
                <td>${user.name} </td>
                <td>${user.email}</td>
                </tr>`;
            });
            document.getElementById("users").innerHTML = li;
        });
}

// POST metódus
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
    .then(response => response.json())
    .then(json => console.log(json));

// PUT metódus
fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    body: JSON.stringify({
        id: 1,
        title: "foo",
        body: "bar",
        userId: 1
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
    .then(response => response.json())
    .then(json => console.log(json));

// PATCH metódus
fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PATCH",
    body: JSON.stringify({
        title: "foo",
        body: "bar"
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
    .then(response => response.json())
    .then(json => console.log(json));

// DELETE metódus
fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(json => console.log(json))
    .catch(error => console.error('There was a problem with the fetch operation:', error));
