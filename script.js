// Loading data from JSON file
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    loadProfile(data.profile);
    loadAbout(data.about);
    loadSkills(data.skills);
    loadExperience(data.experience);
    loadGames(data.games);
    loadProjects(data.projects);
    loadShowcase(data.showcase);
  });

function loadProfile(profile) {
  const el = document.getElementById("profile");
  el.innerHTML = `
    <div class="hero-content">
      <span class="hand-emoji">👋</span>
      <h1 class="hero-title">Hello! <b>I'm <span class="name-accent">${profile.name}</span></b></h1>
      
      <div class="hero-job">
        <div class="job-line"></div>
        <span>${profile.role.split(' • ')[0]}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.9-6.2-4.8-6.2 4.8 2.4-7.9L2 9.6h7.6z"/></svg>
      </div>

      <p class="hero-description">${profile.tagline}. Dedicated to crafting immersive experiences through technical excellence.</p>

      <ul class="hero-checklist">
        <li><img src="https://img.icons8.com/material-rounded/24/ffffff/checkmark.png"/> Core Gameplay & Systems Architecture</li>
        <li><img src="https://img.icons8.com/material-rounded/24/ffffff/checkmark.png"/> High-Performance Scalable Tools</li>
        <li><img src="https://img.icons8.com/material-rounded/24/ffffff/checkmark.png"/> User-Centric Design & UX Engineering</li>
      </ul>

      <div class="hero-actions">
        <a href="#contact" class="btn btn-talk">Let's Talk</a>
        <a href="${profile.socials[2].url}" download= "doc/Curriculo(Luiz Ricardo Fuly Silva).pdf" class="btn-cv">Download CV <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M7 7l10 10M17 7v10H7"/></svg></a>
      </div>
    </div>

    <div class="hero-avatar-side">
      <div class="avatar-bg-glow"></div>
      <img src="${profile.avatar}" class="avatar-main" alt="${profile.name}" />
    </div>
  `;
}

function loadAbout(about) {
  const el = document.getElementById("about");
  about.forEach(paragraph => {
    el.innerHTML += `<p class="about-paragraph">${paragraph}</p>`;
  });
}

function loadSkills(skills) {
  const el = document.getElementById("skills");
  // Duplicate skills for seamless loop
  const skillsList = [...skills, ...skills];
  skillsList.forEach(skill => {
    el.innerHTML += `
      <div class="marquee-item">
        <span class="gradient-text">•</span> ${skill}
      </div>`;
  });
}

function loadExperience(experience) {
  paginate({
    data: experience,
    containerId: "experience",
    paginationId: "experience-pagination",
    itemsPerPage: 3,
    renderItem: (exp, index, start) => {
      const globalIndex = (start || 0) + index + 1;
      const isAbsoluteFirst = (start || 0) === 0 && index === 0;
      const highlightClass = isAbsoluteFirst ? "highlight" : "";
      return `
        <div class="experience-item ${highlightClass}">
          <div class="exp-main">
            <div class="exp-number-box">${globalIndex}</div>
            <div class="exp-content">
              <h3>${exp.role}</h3>
              <p>${exp.company} - ${exp.location}</p>
            </div>
          </div>
          <div class="exp-right">
            <div class="exp-sep"></div>
            <div class="exp-duration">JOB DURATION - ${exp.duration}</div>
          </div>
        </div>
      `;
    }
  });
}

function loadGames(games) {
  paginate({
    data: games,
    containerId: "games",
    paginationId: "games-pagination",
    itemsPerPage: 2,
    renderItem: (p) => `
      <a href="${p.link}" class="case-study-card" target="_blank">
        <div class="case-image">
          <img src="${p.image}" alt="${p.title}" />
        </div>
        <div class="case-content">
          <div class="case-tags">
            ${p.tech.map(t => `<span class="case-tag">${t}</span>`).join('')}
          </div>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="see-details">
            See Details 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 17l10-10M17 17V7H7"/>
            </svg>
          </div>
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
    itemsPerPage: 2,
    renderItem: (p) => `
      <a href="${p.link}" class="case-study-card" target="_blank">
        <div class="case-image">
          <img src="${p.image}" alt="${p.title}" />
        </div>
        <div class="case-content">
          <div class="case-tags">
            ${p.tech.map(t => `<span class="case-tag">${t}</span>`).join('')}
          </div>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="see-details">
            See Details 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 17l10-10M17 17V7H7"/>
            </svg>
          </div>
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
    renderItem: (item) => `
      <div class="case-study-card">
        <div class="case-image">
          <iframe src="https://www.youtube.com/embed/${item.youtubeId}" allowfullscreen style="width: 100%; height: 100%; border:0;"></iframe>
        </div>
        <div class="case-content">
          <div class="case-tags">
            ${item.tech ? item.tech.map(t => `<span class="case-tag">${t}</span>`).join('') : '<span class="case-tag">Video Showcase</span>'}
          </div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="see-details">
            Watch Full Video 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 17l10-10M17 17V7H7"/>
            </svg>
          </div>
        </div>
      </div>
    `
  });
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

    data.slice(start, end).forEach((item, index) => {
      container.innerHTML += renderItem(item, index, start);
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

// Service Tag selection
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('service-tag')) {
    e.target.classList.toggle('active');

    // Update hidden input with selected tags
    const activeTags = Array.from(document.querySelectorAll('.service-tag.active'))
      .map(tag => tag.textContent)
      .join(', ');
    const input = document.getElementById('interests-input');
    if (input) input.value = activeTags;
  }
});

// Form submission handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const interests = document.getElementById('interests-input').value;
      if (!interests) {
        alert('Please select at least one interest (Gameplay, UI, etc.) before sending.');
        return;
      }

      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Thanks for reaching out! I will get back to you within 24 hours.');
        contactForm.reset();
        document.querySelectorAll('.service-tag').forEach(tag => tag.classList.remove('active'));
        if (document.getElementById('interests-input')) {
          document.getElementById('interests-input').value = '';
        }
      } else {
        const data = await response.json();
        alert(data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! There was a problem submitting your form');
      }
    } catch (error) {
      alert('Oops! There was a problem submitting your form. Please try again later.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
