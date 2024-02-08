// app.js

let currentPage = 25; // Start from the first page

function loadPage(pageNumber) {
    // Assuming the content of each page is in a separate .html file under the 'pages' directory
    const pagePath = `Bhagavad-gita-Swami-BG-Narasingha_Page_${pageNumber}.html`;


    fetch(pagePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content-area').innerHTML = data;
        })
        .catch(error => console.error('Error loading page:', error));
}

function setupNavigation() {
    document.getElementById('prev-arrow').addEventListener('click', () => {
        if (currentPage > 25) { // Check for lower bound
            currentPage--;
            loadPage(currentPage);
        }
    });

    document.getElementById('next-arrow').addEventListener('click', () => {
        if (currentPage < 592) { // Check for upper bound
            currentPage++;
            loadPage(currentPage);
        }
    });
}

// This single event listener is sufficient to initialize both functions
document.addEventListener('DOMContentLoaded', () => {
    console.log('Bhagwad Gita App is loaded and ready!');
    loadPage(currentPage); // Load the initial page
    setupNavigation(); // Setup navigation arrows
});


