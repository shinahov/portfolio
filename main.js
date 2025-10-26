

const projectData = [
{
  title: "Arduino Waveform Visualizer on LCD",
  summary: "Displays different mathematical waveforms live on a 16x2 LCD display.",
  tech: ["Arduino", "C++", "LCD", "Analog Input"],
  tags: ["embedded", "c"],
  code: "https://github.com/shinahov/WaveVisualizer",
  video: "https://www.youtube.com/watch?v=ch2Q4CFUjxY", 
  docsHtml: `
  <h4>Project Description</h4>
  <p>This Arduino project visualizes various mathematical functions 
  — sine, cosine, tangent, square, saw, triangle, and a complex waveform — 
  on a 16x2 LCD screen.</p>

  <h4>Hardware</h4>
  <ul>
    <li>Arduino Uno</li>
    <li>16x2 LCD using the LiquidCrystal library</li>
    <li>Two potentiometers to control frequency and speed</li>
    <li>A button to switch between wave types</li>
  </ul>

  <h4>Software Details</h4>
  <p>The signals are generated using mathematical functions 
  (<code>sin</code>, <code>cos</code>, and custom square/saw functions).
  The code uses <code>LiquidCrystal</code> for display output and 
  reacts to analog inputs from A0 and A1.</p>

  <p><strong>Language:</strong> C++ (Arduino)</p>
`

  },

  {
  title: "TafelAnwendung – Family Management System",
  summary: "JavaFX desktop app using SQLite to manage families for a food bank (Tafel). Includes visit tracking and simple data entry.",
  tech: ["Java", "JavaFX", "SQLite"],
  tags: ["java", "sql"],
  code: "https://github.com/shinahov/Tafel/tree/master",
  docsHtml: `
  <div class="docs-gallery">
    <img class="image" src="besuch_reg.png" alt="Visit registration window" />
    <img class="image" src="Fam_hinzufugen.png" alt="Add family dialog" />
  </div>

  <div class="docs-text">
    <p><strong>Project Description:</strong><br>
    The TafelAnwendung is a desktop application built with <strong>JavaFX</strong> and <strong>SQLite</strong>. It is designed to help manage families who regularly use the services of a food bank. The app supports adding families and members, recording their visits, and tracking important notes such as blacklist warnings.</p>

    <p><strong>Main Features:</strong><br>
    • <strong>Family Management:</strong> Add, edit, and delete families and their members.<br>
    • <strong>Visit Logging:</strong> Automatically records visits; older entries can be cleaned up.<br>
    • <strong>Blacklist Check:</strong> Warns if a person is blacklisted.<br>
    • <strong>Auto Deletion:</strong> Deletes old visit logs (older than two months) with one click.</p>

    <p><strong>Architecture:</strong><br>
    • <strong>Frontend (UI):</strong> Built with JavaFX for an intuitive interface.<br>
    • <strong>Database:</strong> Uses SQLite to store families and visit records locally.<br>
    • <strong>Controller Layer:</strong> Links UI and database logic with clear separation of concerns.</p>

    <p><strong>Requirements:</strong><br>
    • Java 11 or higher<br>
    • JavaFX library<br>
    • SQLite database engine</p>

    <p><strong>Future Improvements:</strong><br>
    This project could be extended with reports, an enhanced blacklist system, and an improved user interface.</p>
  </div>
  `
},

  {
    title: "Hack‑Assembler (Nand2Tetris)",
    summary: "Assembler in Java zum Übersetzen des Hack‑Maschinencodes. Fokus: saubere Ausgabe nur mit Dateiname + Binärcode.",
    tech: ["Java"],
    tags: ["java"],
    code: "#",
    more: "#"
  },
  {
    title: "Clustering mit B‑Method (SimB/ProB)",
    summary: "Modellierung von K‑Means und hierarchischem Clustering (Single Linkage) in B, Visualisierung und Steuerung über ProB/SimB.",
    tech: ["B‑Method", "ProB", "Python"],
    tags: ["formal", "python"],
    code: "#",
    more: "#"
  }

];

function renderProjects(filter = "all") {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = "";

  const list = projectData.filter(p => filter === "all" || (p.tags && p.tags.includes(filter)));

  list.forEach((p, i) => {
    const el = document.createElement("article");
    el.className = "card";

   
    const hasDetails = !!(p.video || p.docsHtml);

    el.innerHTML = `
      <div class="card-header">
        <span class="badge">${p.tech?.[0] ?? "Project"}</span>
        <h3 class="card-title">${p.title}</h3>
      </div>
      <div class="card-body">
        <p>${p.summary}</p>
        <div class="tags">${(p.tech || []).map(t => `<span class='tag'>${t}</span>`).join("")}</div>
      </div>
      <div class="card-actions">
        ${p.code ? `<a class="btn btn-outline" href="${p.code}" target="_blank" rel="noreferrer noopener">Code</a>` : ""}
        ${hasDetails ? `<button class="btn btn-ghost" data-expand="${i}" aria-expanded="false" aria-controls="details-${i}">More</button>` : ""}
      </div>

      ${hasDetails ? `
      <div id="details-${i}" class="card-details" aria-hidden="true">
        <div class="card-details__inner">
          <div class="card-details__body">
            <div class="card-details__video"></div>
            <div class="card-details__docs"></div>
          </div>
        </div>
      </div>` : ""}
    `;

    grid.appendChild(el);
  });
}


function setupFilters() {
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const f = chip.getAttribute("data-filter");
      renderProjects(f);
    });
  });
}

function setupTheme() {
  const btn = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme") || "dark";
  applyTheme(stored);
  btn.textContent = stored === "dark" ? "Light" : "Dark";
  btn.addEventListener("click", () => {
    const newTheme = document.documentElement.classList.contains("theme-light") ? "dark" : "light";
    applyTheme(newTheme);
    btn.textContent = newTheme === "dark" ? "Light" : "Dark";
  });
}

function applyTheme(mode) {
  if (mode === "light") {
    document.documentElement.classList.add("theme-light");
  } else {
    document.documentElement.classList.remove("theme-light");
  }
  localStorage.setItem("theme", mode);
}

function setYear() {
  const y = document.getElementById("year");
  y.textContent = new Date().getFullYear();
}

function toEmbed(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch { return null; }
}


function closeAllDetails() {
  document.querySelectorAll(".card-details.open").forEach(d => {
    d.classList.remove("open");
    d.setAttribute("aria-hidden", "true");
    const btn = document.querySelector(`[aria-controls="${d.id}"]`);
    if (btn) btn.setAttribute("aria-expanded", "false");


    const v = d.querySelector(".card-details__video");
    if (v) v.innerHTML = "";
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-expand]");
  if (!btn) return;

  const idx = parseInt(btn.getAttribute("data-expand"), 10);
  const details = document.getElementById(`details-${idx}`);
  if (!details) return;

  const isOpen = details.classList.contains("open");


  closeAllDetails();

  if (!isOpen) {
 
    details.classList.add("open");
    details.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");


    const p = projectData[idx];
    const videoWrap = details.querySelector(".card-details__video");
    const docsWrap  = details.querySelector(".card-details__docs");

    if (videoWrap) {
      const embed = toEmbed(p.video);
      videoWrap.innerHTML = embed
        ? `<iframe src="${embed}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : "";
    }
    if (docsWrap) {
      docsWrap.innerHTML = p.docsHtml || "";
    }

 
    details.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});



document.addEventListener("DOMContentLoaded", () => {
 
  const btnTheme = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme") || "dark";
  applyTheme(stored);
  if (btnTheme) {
    btnTheme.textContent = stored === "dark" ? "Light" : "Dark";
    btnTheme.addEventListener("click", () => {
      const newTheme = document.documentElement.classList.contains("theme-light") ? "dark" : "light";
      applyTheme(newTheme);
      btnTheme.textContent = newTheme === "dark" ? "Light" : "Dark";
    });
  }


  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const f = chip.getAttribute("data-filter") || "all";
      renderProjects(f);
    
    });
  });

  
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

 
  renderProjects("all");
});

