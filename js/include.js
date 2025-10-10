// include.js
async function loadIncludes() {
  const includeElements = document.querySelectorAll('[data-include]');

  const fetches = Array.from(includeElements).map(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Could not fetch ${file}`);
      const content = await response.text();
      el.innerHTML = content;
    } catch (err) {
      console.error(err);
      el.innerHTML = `<p style="color:red;">Failed to load ${file}</p>`;
    }
  });

  // Wait for all includes to finish
  await Promise.all(fetches);

  // Now that header/footer are loaded, initialize the site
  if (typeof initSite === 'function') {
    initSite();
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadIncludes);
