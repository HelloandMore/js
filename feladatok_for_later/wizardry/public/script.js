document.addEventListener('DOMContentLoaded', () => {
    // Téma váltó inicializálása
    const themeSwitch = document.getElementById('themeSwitch');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }

    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : '';
        localStorage.setItem('theme', currentTheme);
    });
    const form = document.getElementById('wizardForm');
    const wizardsDiv = document.getElementById('wizards');
    let currentWizardId = null;

    // Varázslók betöltése
    async function loadWizards() {
        try {
            const response = await fetch('/wizard');
            const wizards = await response.json();

            wizardsDiv.innerHTML = wizards.map(wizard => `
        <div class="wizard">
          <h3>${wizard.name}</h3>
          <p>Pálca: ${wizard.magicWand}</p>
          <p>Ház: ${wizard.house}</p>
          <button onclick="editWizard('${wizard.id}')">Szerkesztés</button> <!-- ID javítás -->
          <button onclick="deleteWizard('${wizard.id}')">Törlés</button> <!-- ID javítás -->
        </div>
      `).join('');
        } catch (err) {
            console.error('Hiba:', err);
        }
    }

    // Űrlap kezelése
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const wizardData = {
            name: document.getElementById('name').value,
            magicWand: document.getElementById('magicWand').value,
            house: document.getElementById('house').value
        };

        const url = currentWizardId ? `/wizard/${currentWizardId}` : '/wizard';
        const method = currentWizardId ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(wizardData)
        });

        form.reset();
        currentWizardId = null;
        alert('Mentés sikeres!');
        loadWizards();
    });

    // Szerkesztés
    window.editWizard = async (id) => {
        const response = await fetch(`/wizard/${id}`);
        const wizard = await response.json();
        document.getElementById('name').value = wizard.name;
        document.getElementById('magicWand').value = wizard.magicWand;
        document.getElementById('house').value = wizard.house;
        currentWizardId = id;
    };

    // Törlés
    window.deleteWizard = async (id) => {
        if (!confirm('Biztosan törölni szeretnéd ezt a varázslót?')) return;
        await fetch(`/wizard/${id}`, { method: 'DELETE' });
        loadWizards();
    };

    // Kezdeti betöltés
    loadWizards();
});