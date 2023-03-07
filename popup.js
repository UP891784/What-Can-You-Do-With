// Get references to the UI elements
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

// Get the search query from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search');

// If there's a search query, set it as the value of the search input and perform the search
if (searchQuery) {
  searchInput.value = searchQuery;
  search();
}

// Add a listener to the search button
searchBtn.addEventListener('click', search);

// Create a context menu item to search for text
chrome.contextMenus.create({
  title: 'What Can You Do With "%s"',
  contexts: ['selection'],
  onclick: searchSelection
});

// Search for the entered text
function search() {
  const searchText = searchInput.value.toLowerCase();
  const dataUrl = chrome.runtime.getURL('database.json');

  fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
      const results = data.filter(item => item.noun.toLowerCase() === searchText);
      if (results.length > 0) {
        resultsDiv.innerHTML = results[0].uses;
      } else {
        resultsDiv.innerHTML = 'Nothing found in the database.';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      resultsDiv.innerHTML = 'An error occurred while searching the database. Please try again later.';
    });
}

// Search for the selected text in the context menu
function searchSelection(info, tab) {
  const searchText = info.selectionText.toLowerCase();
  chrome.tabs.create({ url: `popup.html?search=${searchText}` });
}
