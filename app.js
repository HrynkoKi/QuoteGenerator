let apiQuotes = [];

// Show New Quote
const newQuote = function () {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    return quote;
};

// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        // Catch Error Here
    }
}

// On Load
getQuotes();
