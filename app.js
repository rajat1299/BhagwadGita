// app.js

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Bhagwad Gita App is loaded and ready!');
    generateNavigation(); // Call generateNavigation function here
});

function generateNavigation() {
    const navContainer = document.getElementById('navigation');
    // Start from 25 to 592 according to your file numbering
    for (let i = 25; i <= 592; i++) {
        const pageNumber = i.toString().padStart(3, '0'); // Ensure the page number has three digits
        const chapterPath = `Bhagavad-gita-Swami-BG-Narasingha_Page_${pageNumber}.html`;
        const link = document.createElement('a');
        link.href = chapterPath;
        link.textContent = `Page ${pageNumber}`; // Text content of the link
        link.classList.add('chapter-link'); // Add CSS class for styling
        navContainer.appendChild(link);
    }
}

