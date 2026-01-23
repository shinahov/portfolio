

const projectData = [
{ 
  order: 7,
  title: "Arduino Waveform Visualizer on LCD",
  summary: "Displays different mathematical waveforms live on a 16x2 LCD display.",
  tech: ["Arduino", "C++", "LCD", "Analog Input"],
  tags: ["embedded", "c++"],
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
  order: 6,
  title: "TafelAnwendung – Family Management System",
  summary: "JavaFX desktop app using SQLite to manage families for a food bank (Tafel). Includes visit tracking and simple data entry.",
  tech: ["Java", "JavaFX", "SQLite"],
  tags: ["java", "sql"],
  code: "https://github.com/shinahov/Tafel/tree/master",
  docsHtml: `
  <div class="docs-gallery">
    <img class="image" src="images/besuch_reg.png" alt="Visit registration window" />
    <img class="image" src="images/Fam_hinzufugen.png" alt="Add family dialog" />
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
  order: 4,
  title: "UFC Fight Prediction (ML Pipeline)",
  summary: "End-to-end pipeline to predict UFC fight outcomes: data collection, feature engineering, model training, and evaluation.",
  tech: ["Python", "pandas", "scikit-learn", "XGBoost", "Matplotlib"],
  tags: ["Python", "machine-learning", "classification", "sports-analytics"],
  code: "https://github.com/shinahov/ufc-fight-prediction",
  docsHtml: `
  <div class="docs-text">
    <p><strong>Project Description:</strong><br>
    This project builds a machine learning model to <strong>predict UFC fight outcomes</strong>. It automatically scrapes up-to-date fight data, cleans and prepares it, and then trains several models to estimate the winner probabilities.</p>

    <p><strong>Technologies & Methods:</strong><br>
    • <strong>Python</strong> for data processing and automation<br>
    • <strong>pandas / NumPy</strong> for data cleaning and feature engineering<br>
    • <strong>scikit-learn</strong> and <strong>XGBoost</strong> for training and evaluation<br>
    • <strong>BeautifulSoup / requests</strong> for web scraping<br>
    • <strong>Matplotlib</strong> for visualization</p>

    <p><strong>Overview:</strong><br>
    The pipeline fetches current UFC fight data from the web, processes fighter statistics, builds numerical features (reach, striking rate, win streaks, etc.), and evaluates model accuracy and feature importance to understand key predictors.</p>
  </div>
  `

},


  {
  order: 3,
  title: "Clustering with the B-Method (ProB/SimB)",
  summary: "Formal modeling of K-Means and Hierarchical Clustering (Single Linkage) in B, verified in ProB/SimB and visualized via VisB.",
  tech: ["B-Method", "ProB", "SimB", "VisB", "Python"],
  tags: ["Python", "formal", "clustering", "visualization"],
  code: "https://github.com/shinahov/Clustering_B",
  docsHtml: `
  <div class="docs-gallery">
    <img class="image" src="images/K-means_B.png" alt="K-Means model in B and VisB visualization" />
    <img class="image" src="images/K-means-py.png" alt="K-Means clustering with Python and scikit-learn" />
  </div>

  <div class="docs-text">
    <p><strong>Project Description:</strong><br>
    This project demonstrates how classical clustering algorithms like <strong>K-Means</strong>, <strong>Hierarchical Clustering</strong> (Single Linkage), and <strong>Gaussian Mixture Models (GMM)</strong> can be formally specified and executed in the <strong>B-Method</strong>.
    The goal is to show that data-driven algorithms can also be represented, verified, and visualized through <strong>formal methods</strong>.</p>

    <p><strong>Concept and Implementation:</strong><br>
    • Models are specified as <strong>B machines</strong> and animated/verified using <strong>ProB</strong> and <strong>SimB</strong>.<br>
    • The system state and results are visualized in <strong>VisB</strong>.<br>
    • <strong>Python</strong> and <strong>Java</strong> handle automation, data generation, and communication using <strong>JSON</strong>.<br>
    • Comparative runs are performed using <strong>scikit-learn</strong> for validation.</p>

    <p><strong>Technologies Used:</strong><br>
    • B-Method (Formal Specification)<br>
    • ProB / SimB (Model Checking & Simulation)<br>
    • VisB (Visualization)<br>
    • Python & Java (Integration & Automation)</p>

    <p><strong>Purpose:</strong><br>
    The project connects <strong>formal verification</strong> with <strong>machine learning concepts</strong>, demonstrating that clustering logic can be formally reasoned about and visually analyzed through the B-toolchain.</p>
  </div>
  `
},


{
  order: 1, 
  title: "MockLang – Hobby Programming Language",
  summary: "Educational programming language project: lexer → parser → semantic analysis → VM + x86_64 assembly generation (WIP). Stack-based with multi-return functions.",
  tech: ["Python", "Lexer/Parser", "Symbol Table", "VM", "x86_64 ASM"],
  tags: ["Python", "compilers", "language", "vm", "asm"],
  code: "https://github.com/shinahov/MockLang",
  video: null,
  docsHtml: `
    <h4>Project Description</h4>
    <p>
      MockLang is a small hobby programming language built to understand how compilers work end-to-end:
      tokenizing, parsing, semantic checks, and then generating low-level code. It’s purely educational
      and inspired by the Nand2Tetris style of building a toolchain step by step.
    </p>

    <h4>Highlights</h4>
    <ul>
      <li><strong>Stack-based execution model</strong> (VM and assembly are stack-oriented)</li>
      <li><strong>Multiple return values</strong> (functions can return more than one value)</li>
      <li><strong>Scoped symbol tables</strong> with type and scope analysis</li>
      <li><strong>Control flow</strong>: if/else, loops, expressions</li>
      <li><strong>No explicit constructors</strong> (object creation follows language rules instead of a dedicated ctor keyword)</li>
    </ul>

    <h4>Toolchain</h4>
    <ul>
      <li><strong>Tokenizer.py</strong> – Lexer</li>
      <li><strong>Parser.py</strong> – AST builder</li>
      <li><strong>SymbolAnalyzer.py</strong> – scope + type analysis</li>
      <li><strong>VMGenerator.py</strong> – VM instruction generation</li>
      <li><strong>ASMGenerator.py</strong> – x86_64 NASM-style code generation (WIP)</li>
    </ul>

    <h4>Example</h4>
    <pre><code>class Ball [radius:int, x:int, y:int, speed:float]:
  create int z;
  set z to 10;
  print(z);

  getRadius() -> int:
    return self.radius;
  end

  fn main() -> void:
    create int b = 5;
    print(b);
  END
end</code></pre>

    <h4>Current Stage</h4>
    <p>
      VM generation is implemented. Assembly generation is in progress, including handling stack calling conventions
      and copying multiple return values back to the caller’s argument area.
    </p>
  `
},


{
  order: 5,
  title: "Bioinformatics – Rosalind Problem Solving",
  summary: "Solving classical DNA-related problems from the Rosalind platform using Python.",
  tech: ["Python", "bioinformatics"],
  tags: ["Python", "bioinformatics"],
  code: "https://github.com/shinahov/bioinformatics",
  video: null,
  docsHtml: `
    <h4>Project Description</h4>
    <p>This repository contains my solutions to various bioinformatics challenges 
    from the Rosalind platform. The goal is to practice DNA sequence processing, 
    GC-content analysis, complement generation, and other core concepts from 
    computational biology.</p>

    <h4>Purpose</h4>
    <p>I use this project to improve my bioinformatics skills and continuously 
    extend the repository with new tasks as I progress.</p>

    <p><strong>Language:</strong> Python</p>
  `
},

{
  order: 2, 
  title: "Real-Time Ride Sharing – Prototype (Concept)",
  summary: "Prototype of an Uber-like map app with route-based matching: drivers already traveling A→B can pick up walkers near their route for a ride segment. Real-time simulation + live map visualization.",
  tech: ["Python", "OSRM", "Leaflet", "WebSockets", "Geo Routing"],
  tags: ["Python", "web", "realtime", "routing", "maps"],
  code: "https://github.com/shinahov/DriveBy",
  video: null, 
  docsHtml: `
    <h4>Concept</h4>
    <p>
      Think of it as an “Uber-like” map app, but with a different idea:
      drivers are <strong>already traveling from A → B</strong> (no dedicated ride start),
      and walkers are going in a similar direction. The system inserts a <strong>ride segment</strong> into the walker’s trip:
      walk → pickup → ride → dropoff → walk.
    </p>

    <div class="docs-gallery">
    <img class="image" src="images/map-navigation.png" alt="Map navigation view" />
    <img class="image" src="images/pickup.png" alt="Pickup" />
    <img class="image" src="images/simulation-view.png" alt="simulation view" />
    </div>

    <h4>Route Matching (Pickup & Dropoff)</h4>
    <ul>
      <li>Routes are fetched via <strong>OSRM</strong> (driving for drivers, walking for walkers).</li>
      <li>Routes are stored as polylines: lists of <code>(lat, lon)</code> points.</li>
      <li>Matching finds:
        <ul>
          <li>a pickup point on the driver route that minimizes walking distance from walker start</li>
          <li>a later dropoff point that minimizes walking distance to walker destination</li>
        </ul>
      </li>
      <li>“Best driver” selection is currently simple and based on travel/walking cost.</li>
    </ul>

    <h4>What’s implemented</h4>
    <ul>
      <li><strong>Backend simulation loop (Python):</strong> agents move along polylines over time (<code>t += dt</code>).</li>
      <li><strong>Route + match computation:</strong> OSRM routing + prototype matching step.</li>
      <li><strong>Frontend map (Leaflet):</strong> driver/walker positions, match routes, pickup/dropoff markers.</li>
      <li><strong>Real-time updates:</strong> switching from polling to <strong>WebSockets</strong> (almost finished).</li>
    </ul>

    <h4>How it works (prototype architecture)</h4>
    <ul>
      <li>Backend receives “create agent” requests (driver/walker), computes routes, tries matching, updates positions each tick.</li>
      <li>Frontend shows live state on a map (navigation-style follow/zoom + overview).</li>
      <li>Matching logic is “good enough for a prototype”, not yet designed for high load.</li>
    </ul>

    <h4>Current Stage</h4>
    <p>
      WebSocket implementation is almost finished. The system works as a technical prototype, but UI/state transitions still need polishing.
    </p>

    <h4>Next steps</h4>
    <ol>
      <li><strong>Stabilize UI + simulation flow</strong> (state switches, unmatched → matched transitions, timing issues).</li>
      <li><strong>Stable ID/session flow</strong> for multi-tab / multi-user usage (no collisions, clean transitions).</li>
      <li><strong>Real GPS input from client</strong> (via JS browser geolocation) + real address selection instead of pinned start/destination.</li>
      <li><strong>Persistence</strong> (sessions, agents, matches) so runs survive refresh/restart and map naturally to a DB model.</li>
      <li><strong>Better matching for scale</strong> (spatial indexing, feasibility checks, fairer policies, stronger objective functions).</li>
    </ol>
  `
},






];

function renderProjects(filter = "all") {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = "";

  const list = projectData.filter(p => filter === "all" || (p.tags && p.tags.includes(filter)))
  .sort((a,b)=> a.order - b.order);

  list.forEach((p) => {
    const idx = projectData.indexOf(p); // original index in projectData
  
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
        ${hasDetails ? `<button class="btn btn-ghost" data-expand="${idx}" aria-expanded="false" aria-controls="details-${idx}">More</button>` : ""}
      </div>
  
      ${hasDetails ? `
      <div id="details-${idx}" class="card-details" aria-hidden="true">
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

