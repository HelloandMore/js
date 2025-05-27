// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeToggle(savedTheme);
    
    // Set up theme toggle event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Save preference
            localStorage.setItem('theme', newTheme);
            
            // Apply new theme
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            
            // Update toggle icon and text
            updateThemeToggle(newTheme);
        });
    }
});

function updateThemeToggle(theme) {
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (themeIcon) {
        themeIcon.className = theme === 'dark' 
            ? 'bi bi-sun-fill' 
            : 'bi bi-moon-fill';
    }
    
    if (themeText) {
        themeText.textContent = theme === 'dark' 
            ? 'Világos mód' 
            : 'Sötét mód';
    }
}
