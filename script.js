// Loading data from JSON file

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    loadProfile(data.profile);
    loadAbout(data.about);
    loadSkills(data.skills);
    loadGames(data.games);
    loadProjects(data.projects);
    loadShowcase(data.showcase);
  });

  // Functions to load different sections
function loadProfile(profile) {
  const el = document.getElementById("profile");
  el.innerHTML = `
    <div class="hero-text">
      <h1>${profile.name}</h1>
      <p>${profile.role}</p>
      <small>${profile.tagline}</small>
    </div>

    <div class="hero-avatar">
        <img src="${profile.avatar}" />
    </div>

    <div class="hero-actions">
        <a href="${profile.socials[0].url}" target="_blank" class="btn secondary">
            GitHub
        </a>

        <a href="${profile.socials[1].url}" target="_blank" class="btn secondary">
            LinkedIn
        </a>

        <a href="${profile.socials[2].url}" target="_blank" download="Luiz Ricardo Fuly Silva (CV)" class="btn primary">
            Download CV
        </a>
    </div>
  `;
}

function loadAbout(about) {
  const el = document.getElementById("about");
  about.forEach(paragraph => {
    el.innerHTML += `<p>${paragraph}</p>`;
  });
}

function loadSkills(skills) {
  const ul = document.getElementById("skills");
  skills.forEach(skill => {
    ul.innerHTML += `<li>${skill}</li>`;
  });
}

function loadGames(games) {
  paginate({
    data: games,
    containerId: "games",
    paginationId: "games-pagination",
    itemsPerPage: 3,
    renderItem: (p) => `
      <a href="${p.link}" class="games-link" target="_blank">
        <div class="games">
          <img src="${p.image}" />
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <small>${p.tech.join(" • ")}</small>
          <small>${p.role}</small>
          <small>${p.Studio}</small>
        </div>
      </a>
    `
  });
}

function loadProjects(projects) {
  paginate({
    data: projects,
    containerId: "projects",
    paginationId: "projects-pagination",
    itemsPerPage: 3,
    renderItem: (p) => `
      <a href="${p.link}" class="project-link" target="_blank">
        <div class="project">
          <img src="${p.image}" />
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <small>${p.tech.join(" • ")}</small>
        </div>
      </a>
    `
  });
}

function loadShowcase(items) {
  paginate({
    data: items,
    containerId: "showcase",
    paginationId: "showcase-pagination",
    itemsPerPage: 2,
    renderItem: (item) =>`
      <div class="showcase">
        <iframe
          src="https://www.youtube.com/embed/${item.youtubeId}"
          allowfullscreen>
        </iframe>

        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <small>${item.tech.join(" • ")}</small>
      </div>
    `
  })
}


// Pagination function

function paginate({
  data,
  containerId,
  paginationId,
  itemsPerPage,
  renderItem
}) {
  const container = document.getElementById(containerId);
  const pagination = document.getElementById(paginationId);

  let currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  function render() {
    container.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    data.slice(start, end).forEach(item => {
      container.innerHTML += renderItem(item);
    });

    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";

    if (data.length <= itemsPerPage) {
      pagination.style.display = "none";
      return;
    }

    pagination.style.display = "flex";

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");

      btn.onclick = () => {
        currentPage = i;
        render();
      };

      pagination.appendChild(btn);
    }
  }

  render();
}

