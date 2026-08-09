const grid = document.getElementById('presidents');
const search = document.getElementById('search');
const sort = document.getElementById('sort');
const resultCount = document.getElementById('result-count');
let presidents = [];

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('');
}

function cardTemplate(president) {
  return `
    <article class="president-card">
      <div class="portrait-wrap">
        <div class="portrait-fallback" aria-hidden="true">
          <div><strong>${initials(president.name)}</strong><span>Add your portrait</span></div>
        </div>
        <img src="${president.image}" alt="Portrait of ${president.name}" loading="lazy"
             onerror="this.style.display='none'">
        <div class="presidential-number" title="Presidential number">${president.number}</div>
      </div>
      <div class="card-body">
        <h2>${president.name}</h2>
        <dl class="facts">
          <div class="fact"><dt>Born</dt><dd>${president.birthDateDisplay}</dd></div>
          <div class="fact"><dt>Died</dt><dd>${president.deathDateDisplay}</dd></div>
          <div class="fact"><dt>Term</dt><dd>${president.term}</dd></div>
        </dl>
      </div>
    </article>`;
}

function render() {
  const term = search.value.trim().toLowerCase();
  const mode = sort.value;

  const filtered = presidents.filter(p => p.name.toLowerCase().includes(term));

  filtered.sort((a, b) => {
    if (mode === 'name') return a.name.localeCompare(b.name);
    if (mode === 'birth') return a.birthDate.localeCompare(b.birthDate);
    return a.number - b.number;
  });

  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'presidency' : 'presidencies'}`;
  grid.innerHTML = filtered.length
    ? filtered.map(cardTemplate).join('')
    : '<p class="empty">No presidents match your search.</p>';
}

fetch('data/presidents.json')
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

search.addEventListener('input', render);
sort.addEventListener('change', render);
