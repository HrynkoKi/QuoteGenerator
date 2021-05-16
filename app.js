// Elements of DOM
const quoteContainerEl = document.getElementById('quote-container');
const quoteTextEl = document.getElementById('quote');
const authorTextEl = document.getElementById('author');
const twitterBtnEl = document.getElementById('twitter');
const newQuoteBtnEl = document.getElementById('new-quote');
const loaderEl = document.getElementById('loader');

// API's Array
let apiQuotes = [];

function showLoadingSpinner() {
    loaderEl.hidden = false;
    quoteContainerEl.hidden = true;
}

function hideLoadingSpinner() {
    quoteContainerEl.hidden = false;
    loaderEl.hidden = true;
}

// Show New Quote
const newQuote = function () {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorTextEl.textContent = 'Unknown';
    } else {
        authorTextEl.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 80) {
        quoteTextEl.classList.add('long-quote');
    } else {
        quoteTextEl.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteTextEl.textContent = quote.text;
    hideLoadingSpinner();
};

// Get Quotes From API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTextEl.textContent} - ${authorTextEl.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Tweet Quote Event Listener
newQuoteBtnEl.addEventListener('click', newQuote);
twitterBtnEl.addEventListener('click', tweetQuote);

// On Load
getQuotes();
