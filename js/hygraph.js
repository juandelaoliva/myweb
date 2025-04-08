const HYGRAPH_ENDPOINT = 'https://eu-west-2.cdn.hygraph.com/content/cm8y6bonk062t07wf1t0jgj2o/master';

function getCurrentLocale() {
  const urlParam = new URLSearchParams(window.location.search).get("lang");
  const stored = localStorage.getItem("lang");
  var current = urlParam || stored || "en";
  console.log('currentLocale-> ', current);
  return current;
}

const currentLocale = getCurrentLocale();
localStorage.setItem("lang", currentLocale);

function highlightActiveLang(current) {
  document.querySelectorAll(".lang-option").forEach(el => {
    el.classList.toggle("active", el.dataset.lang === current);
  });
}

function setupLanguageClickHandler() {
  document.querySelectorAll(".lang-option").forEach(el => {
    el.addEventListener("click", () => {
      const lang = el.dataset.lang;
      localStorage.setItem("lang", lang);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.location.href = url.toString();
    });
  });
}

highlightActiveLang(currentLocale);
setupLanguageClickHandler();

const QUERY = `
  query GetContent($locale: Locale!, $slug: String!) {
    pageContents(where: { slug: $slug }, locales: [$locale]) {
      heroDescription { html }
      aboutMeTitle
      aboutMeContent { html }
      contactNote { html }
      cvDownloadLabel
       aboutItems(locales: [$locale]) {
        id
        label
        value
        href
      }
      projects {
        title
        description { html }
        externalLink
      }
      tab {
        label
        href
      }
      experiences {
        title
        subtitle
        description { html }
      }
      skills {
        name
        category
      }
      localizations(locales: [en, es]) {
        locale
        heroDescription { html }
        aboutMeTitle
        aboutMeContent { html }
        contactNote { html }
        aboutItems {
          id
          label
          value
        }
      }
    }
  }
`;

function fetchContent() {
  const slug = currentLocale === "es" ? "inicio" : "home";
  console.log("Current and slug: ",currentLocale, slug)
  fetch(HYGRAPH_ENDPOINT, {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { locale: currentLocale, slug } })
  })
    .then(res => res.json())
    .then(({ data }) => {
      console.log("DATA:", data);
      const entry = data.pageContents?.[0];
      if (!entry) throw new Error("❌ No pageContent found");

      const localized = entry.localizations.find(l => l.locale === currentLocale);
      const content = localized ? { ...entry, ...localized, aboutItems: entry.aboutItems } : entry;


      updateHTML("about-text", content.heroDescription?.html);
      updateHTML("about-me-title", content.aboutMeTitle);
      updateHTML("download-cv-label", content.cvDownloadLabel);
      updateHTML("about-me-text", content.aboutMeContent?.html);
      updateHTML("contact-note", content.contactNote?.html);

      console.log(content.aboutItems)
      console.log(entry.aboutItems)

      renderAboutItems("about-items", content.aboutItems);
      renderList("project-list", entry.projects, projectTemplate);
      renderList("experience-list", entry.experiences, experienceTemplate);
      renderTabs("tabs-container", entry.tab);

      const techSkills = entry.skills.filter(s => s.category.toLowerCase() === "technical");
      const softSkills = entry.skills.filter(s => s.category.toLowerCase() === "soft");
      renderList("tech-skills", techSkills, s => `<li>${s.name}</li>`);
      renderList("soft-skills", softSkills, s => `<li>${s.name}</li>`);
    })
    .catch(err => console.error("❌ Error al obtener datos de GraphQL:", err));
}

function updateHTML(id, html) {
  const el = document.getElementById(id);
  if (el && html) el.innerHTML = html;
}

function renderList(containerId, items, templateFn) {
  const container = document.getElementById(containerId);
  if (!container || !items) return;
  container.innerHTML = "";
  items.forEach((item, index) => {
    const div = document.createElement("li");
    div.innerHTML = templateFn(item, index);
    container.appendChild(div);
  });
}

function renderAboutItems(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !items) return;
  container.innerHTML = "";
  items.forEach((item, index) => {
    const delay = 0.25 * index;
    const li = document.createElement("li");
    li.className = "wow fadeInUp done";
    li.setAttribute("data-wow-delay", `${delay}s`);
    li.style.visibility = "visible";
    li.style.animationDelay = `${delay}s`;
    li.style.animationName = "fadeInUp";

    // Construimos el contenido; si label existe se muestra con ":" y value en <span>.
    const content = `<p>${item.label ? item.label + ": " : ""}<span>${item.value}</span></p>`;

    // Si hay href, envuelve el contenido en un <a>.
    if (item.href) {
      li.innerHTML = `
        <a aria-label="Open ${item.label || 'link'} in a new tab" 
           target="_blank" 
           href="${item.href}">
          ${content}
        </a>`;
    } else {
      li.innerHTML = content;
    }

    container.appendChild(li);
  });
}

function renderTabs(containerId, tabs) {
  const container = document.getElementById(containerId);
  if (!container || !tabs || !tabs.length) return;
  container.innerHTML = "";
  const ul = document.createElement("ul");
  tabs.forEach((tab, index) => {
    const li = document.createElement("li");
    li.className = index === 0 ? "active" : "";
    
    const a = document.createElement("a");
    // El atributo aria-label se construye dinámicamente con el label del tab.
    a.setAttribute("aria-label", `Open ${tab.label} tab`);
    a.href = tab.href;
    a.textContent = tab.label;
    
    li.appendChild(a);
    ul.appendChild(li);
  });
  container.appendChild(ul);
}


function projectTemplate(p) {
  return `
    <h4>${p.title}</h4>
    ${p.description?.html || ""}
    ${p.externalLink ? `<a href="${p.externalLink}" target="_blank">Visit project</a>` : ""}
  `;
}

function experienceTemplate(e) {
  return `
  <div class="item">
    <h3>${e.title}</h3>
    <div class="item_top">
    <h4>${e.subtitle}</h4>
    </div>
    ${e.description?.html || ""}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", fetchContent);
