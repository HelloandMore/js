const form = document.getElementById('user-form');
const cardsContainer = document.getElementById('cards-container');
const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', () => {
    document.getElementById('username').value = ''; // Clear input field
    cardsContainer.innerHTML = ''; // Clear all user cards
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    if (!username) return;

    const apiUrl = `https://www.codewars.com/api/v1/users/${username}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert('User not found or an error occurred!');
            return;
        }

        const userData = await response.json();
        displayUserCard(userData);
    } catch (error) {
        alert(`Error fetching user data: ${error}`);
    }
});

function displayUserCard(data) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
        <h3>Username: ${data.username}</h3>
        <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
        <p><strong>Clan:</strong> ${data.clan || 'N/A'}</p>
        <p><strong>Languages:</strong> ${data.ranks.languages ? Object.keys(data.ranks.languages).join(', ') : 'N/A'}</p>
        <p><strong>Overall Rank:</strong> ${data.ranks.overall.name}</p>
    `;

    cardsContainer.appendChild(card);
}
