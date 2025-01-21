async function getAllPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function getPostById(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function createPost() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function updatePost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function patchPost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: 'foo',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function deletePost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
        await response.json();
        return 'Sikeresen törölve'
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function main() {
    await getAllPosts();
    await getPostById(1);
    await createPost();
    await updatePost(1);
    await patchPost(1);
    await deletePost(1);
}

main();