// app.js

let currentPage = 25; // Start from the first page

function loadPage(pageNumber) {
    // Ensure the page number has three digits, as in your file names
    const formattedPageNumber = pageNumber.toString().padStart(3, '0');
    const pagePath = `Bhagavad-gita-Swami-BG-Narasingha_Page_${formattedPageNumber}.html`;

    fetch(pagePath)
        .then(response => {
            // Check if the response is ok (status 200)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content-area').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('content-area').innerHTML = '<p>Error loading page content.</p>';
        });
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


