// app.js

let currentPage = 25; // Start from the first page

// Function to load a specific page
function loadPage(pageNumber) {
    const formattedPageNumber = pageNumber.toString().padStart(3, '0');
    const pagePath = `Bhagavad-gita-Swami-BG-Narasingha_Page_${formattedPageNumber}.html`;

    fetch(pagePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content-area').innerHTML = data;
            markPageAsRead(pageNumber); // Mark the page as read
            loadAnnotation(pageNumber); // Load any saved annotation for the page
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('content-area').innerHTML = '<p>Error loading page content.</p>';
        });
}

// Function to set up navigation buttons
function setupNavigation() {
    document.getElementById('prev-arrow').addEventListener('click', () => {
        if (currentPage > 25) {
            currentPage--;
            loadPage(currentPage);
        }
    });

    document.getElementById('next-arrow').addEventListener('click', () => {
        if (currentPage < 592) {
            currentPage++;
            loadPage(currentPage);
        }
    });
}

// Function to save an annotation for a specific page
function saveAnnotation(pageNumber, annotationText) {
    localStorage.setItem(`annotation-${pageNumber}`, annotationText);
}

// Function to load an annotation for a specific page
function loadAnnotation(pageNumber) {
    const annotationText = localStorage.getItem(`annotation-${pageNumber}`);
    const annotationInput = document.getElementById('annotation-input');
    if (annotationInput) {
        annotationInput.value = annotationText || ''; // Load the annotation into the textarea or set to empty string
    }
}

// Function to mark a page as read
function markPageAsRead(pageNumber) {
    let readPages = JSON.parse(localStorage.getItem('readPages')) || [];
    if (!readPages.includes(pageNumber)) {
        readPages.push(pageNumber);
        localStorage.setItem('readPages', JSON.stringify(readPages));
        // Here, you would also update the UI to reflect the read status
    }
}

// Function to check if a page has been read
function checkIfPageRead(pageNumber) {
    let readPages = JSON.parse(localStorage.getItem('readPages')) || [];
    return readPages.includes(pageNumber);
    // Here, you would call this function to update the UI based on read status
}

// Function to get and display a daily verse
function getDailyVerse() {
    // Placeholder for your verses array
    const verses = ['Verse 1', 'Verse 2', 'Verse 3']; // Replace with your actual verses
    const today = new Date().toDateString();
    const index = parseInt(localStorage.getItem('dailyVerseIndex') || '0', 10);

    document.getElementById('daily-verse').textContent = verses[index];
    
    const nextIndex = (index + 1) % verses.length;
    localStorage.setItem('dailyVerseIndex', nextIndex.toString());
    localStorage.setItem('dailyVerseDate', today);
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    loadPage(currentPage); // Load the initial page
    setupNavigation(); // Setup navigation arrows
    
    // Set up daily verse
    const lastShown = localStorage.getItem('dailyVerseDate');
    const today = new Date().toDateString();
    if (today !== lastShown) {
        getDailyVerse();
    } else {
        const index = parseInt(localStorage.getItem('dailyVerseIndex'), 10);
        document.getElementById('daily-verse').textContent = verses[index];
    }

    // Event listener for the save annotation button
    const saveButton = document.getElementById('save-annotation');
    const annotationInput = document.getElementById('annotation-input');
    saveButton.addEventListener('click', () => {
        const annotationText = annotationInput.value;
        saveAnnotation(currentPage, annotationText);
        // Provide user feedback here
    });

    // TODO: Implement search functionality
    // document.getElementById('search-button').addEventListener('click', searchKeyword);
});

// Placeholder for the search function
function searchKeyword() {
    // Implement search functionality
}
