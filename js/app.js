/*
  ============================================================================
  DEVELOPER INFORMATION
  ============================================================================
  Project:   Presidents of the United States
  File:      js/app.js
  Developer: JOFlorida
  Purpose:   Loads presidential data, generates president cards, manages
             portrait display and fallback behavior, and handles visitor
             search and sorting interactions.
  ============================================================================
*/

/*
  DOM References and Application State
  Store references to the page elements used by the application and maintain
  the in-memory collection of president records after the JSON data is loaded.
*/
const grid = document.getElementById('presidents');
const search = document.getElementById('search');
const sort = document.getElementById('sort');
const resultCount = document.getElementById('result-count');
let presidents = [];

/*
  Initials Helper
  Builds a short two-letter fallback label from the first two words of a
  president's name. This is shown when a portrait cannot be loaded.
*/
function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('');
}

/*
  Portrait Path Builder
  Extracts the portrait filename from the data record and returns the standard
  path used by every president image in the originals directory.
*/
function originalImagePath(president) {
  const filename = president.image.split('/').pop();
  return `./images/presidents/originals/${filename}`;
}

/*
  President Card Template
  Creates the HTML for one president card, including the portrait area,
  presidential number, biographical facts, and full-resolution PNG download.
*/
function cardTemplate(president) {
  const image = originalImagePath(president);

  return `
    <article class="president-card">
      <div class="portrait-wrap">
        <div class="portrait-fallback" aria-hidden="true">
          <div>
            <strong>${initials(president.name)}</strong>
            <span>Add your portrait</span>
          </div>
        </div>

        <img
          class="president-portrait"
          src="${image}"
          alt="Portrait of ${president.name}"
          loading="lazy"
          decoding="async">

        <div class="presidential-number" title="Presidential number">
          ${president.number}
        </div>
      </div>

      <div class="card-body">
        <h2>${president.name}</h2>

        <dl class="facts">
          <div class="fact">
            <dt>Born</dt>
            <dd>${president.birthDateDisplay}</dd>
          </div>
          <div class="fact">
            <dt>Died</dt>
            <dd>${president.deathDateDisplay}</dd>
          </div>
          <div class="fact">
            <dt>Term</dt>
            <dd>${president.term}</dd>
          </div>
        </dl>

        <a class="download-link" href="${image}" download>
          Download Full-Resolution PNG
        </a>
      </div>
    </article>`;
}

/*
  Portrait Event Wiring
  Hides the initials placeholder when an image loads successfully. If an image
  fails, the broken image element is removed and the placeholder remains visible.
*/
function wirePortraitEvents() {
  document.querySelectorAll('.president-portrait').forEach(img => {
    const fallback = img.previousElementSibling;

    // Successful portrait load: show the image and hide its placeholder.
    img.addEventListener('load', () => {
      img.classList.add('is-loaded');
      if (fallback) fallback.hidden = true;
    });

    // Failed portrait load: remove the image and keep the fallback visible.
    img.addEventListener('error', () => {
      img.remove();
      if (fallback) fallback.hidden = false;
    });

    /*
      Cached images may already be complete before listeners are attached.
      Handle that case immediately so the fallback does not cover a valid image.
    */
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
      if (fallback) fallback.hidden = true;
    }
  });
}

/*
  Gallery Rendering
  Applies the current search term and sort mode, updates the result count,
  rebuilds the card grid, and then attaches portrait load/error behavior.
*/
function render() {
  const term = search.value.trim().toLowerCase();
  const mode = sort.value;

  // Filter president records by visitor-entered name text.
  const filtered = presidents.filter(president =>
    president.name.toLowerCase().includes(term)
  );

  // Sort the filtered records according to the selected control option.
  filtered.sort((a, b) => {
    if (mode === 'name') return a.name.localeCompare(b.name);
    if (mode === 'birth') return a.birthDate.localeCompare(b.birthDate);
    return a.number - b.number;
  });

  // Report the number of currently displayed presidencies.
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'presidency' : 'presidencies'}`;

  // Build the gallery or display an empty-search message when no records match.
  grid.innerHTML = filtered.length
    ? filtered.map(cardTemplate).join('')
    : '<p class="empty">No presidents match your search.</p>';

  wirePortraitEvents();
}

/*
  Presidential Data Loading
  Retrieves the JSON dataset, stores it in application state, and performs the
  initial render. A visible error message is shown if the data request fails.
*/
fetch('./data/presidents.json?v=20260809-1841', { cache: 'no-store' })
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => {
    presidents = data;
    render();
  })
  .catch(error => {
    console.error(error);
    grid.innerHTML = '<p class="empty">Unable to load presidential data.</p>';
  });

/*
  Visitor Interaction Events
  Re-render the gallery whenever the search text or selected sort mode changes.
*/
search.addEventListener('input', render);
sort.addEventListener('change', render);
