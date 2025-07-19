document.getElementById('browseButton').addEventListener('click', function() {
  document.getElementById('searchContainer').style.display = 'block';
  document.getElementById('searchBar').focus();
});

document.getElementById('searchBar').addEventListener('input', async function() {
  const query = this.value;
  const suggestionsList = document.getElementById('suggestionsList');
  suggestionsList.innerHTML = '';
  if (query.length < 2) return;

  // Using a CORS proxy to fetch Google suggestions (development only)
  const url = `https://corsproxy.io/?https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const suggestions = data[1].slice(0, 5);
    suggestions.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      suggestionsList.appendChild(li);
    });
  } catch (err) {
    suggestionsList.innerHTML = '<li>Error fetching suggestions</li>';
  }
});
