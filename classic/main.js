const projectData = [
  {
    "order": 7,
    "title": "Arduino Waveform Visualizer",
    "summary": "Displays different mathematical waveforms live on a 16x2 LCD display.",
    "tech": [
      "Arduino",
      "C++",
      "LCD",
      "Analog Input"
    ],
    "tags": [
      "embedded",
      "c++"
    ],
    "code": "https://github.com/shinahov/WaveVisualizer",
    "video": "https://www.youtube.com/watch?v=ch2Q4CFUjxY",
    "docsHtml": "\n  <h4>Project Description</h4>\n  <p>This Arduino project visualizes various mathematical functions \n  — sine, cosine, tangent, square, saw, triangle, and a complex waveform — \n  on a 16x2 LCD screen.</p>\n\n  <h4>Hardware</h4>\n  <ul>\n    <li>Arduino Uno</li>\n    <li>16x2 LCD using the LiquidCrystal library</li>\n    <li>Two potentiometers to control frequency and speed</li>\n    <li>A button to switch between wave types</li>\n  </ul>\n\n  <h4>Software Details</h4>\n  <p>The signals are generated using mathematical functions \n  (<code>sin</code>, <code>cos</code>, and custom square/saw functions).\n  The code uses <code>LiquidCrystal</code> for display output and \n  reacts to analog inputs from A0 and A1.</p>\n\n  <p><strong>Language:</strong> C++ (Arduino)</p>\n",
    "category": "Embedded systems"
  },
  {
    "order": 6,
    "title": "Tafel · Family Management",
    "summary": "JavaFX desktop app using SQLite to manage families for a food bank (Tafel). Includes visit tracking and simple data entry.",
    "tech": [
      "Java",
      "JavaFX",
      "SQLite"
    ],
    "tags": [
      "java",
      "sql"
    ],
    "code": "https://github.com/shinahov/Tafel/tree/master",
    "docsHtml": "\n  <div class=\"docs-gallery\">\n    <img class=\"image\" src=\"../images/besuch_reg.png\" alt=\"Visit registration window\" />\n    <img class=\"image\" src=\"../images/Fam_hinzufugen.png\" alt=\"Add family dialog\" />\n  </div>\n\n  <div class=\"docs-text\">\n    <p><strong>Project Description:</strong><br>\n    The TafelAnwendung is a desktop application built with <strong>JavaFX</strong> and <strong>SQLite</strong>. It is designed to help manage families who regularly use the services of a food bank. The app supports adding families and members, recording their visits, and tracking important notes such as blacklist warnings.</p>\n\n    <p><strong>Main Features:</strong><br>\n    • <strong>Family Management:</strong> Add, edit, and delete families and their members.<br>\n    • <strong>Visit Logging:</strong> Automatically records visits; older entries can be cleaned up.<br>\n    • <strong>Blacklist Check:</strong> Warns if a person is blacklisted.<br>\n    • <strong>Auto Deletion:</strong> Deletes old visit logs (older than two months) with one click.</p>\n\n    <p><strong>Architecture:</strong><br>\n    • <strong>Frontend (UI):</strong> Built with JavaFX for an intuitive interface.<br>\n    • <strong>Database:</strong> Uses SQLite to store families and visit records locally.<br>\n    • <strong>Controller Layer:</strong> Links UI and database logic with clear separation of concerns.</p>\n\n    <p><strong>Requirements:</strong><br>\n    • Java 11 or higher<br>\n    • JavaFX library<br>\n    • SQLite database engine</p>\n\n    <p><strong>Future Improvements:</strong><br>\n    This project could be extended with reports, an enhanced blacklist system, and an improved user interface.</p>\n  </div>\n  ",
    "category": "Java & databases"
  },
  {
    "order": 4,
    "title": "UFC Fight Prediction",
    "summary": "End-to-end pipeline to predict UFC fight outcomes: data collection, feature engineering, model training, and evaluation.",
    "tech": [
      "Python",
      "pandas",
      "scikit-learn",
      "XGBoost",
      "Matplotlib"
    ],
    "tags": [
      "Python",
      "machine-learning",
      "classification",
      "sports-analytics"
    ],
    "code": "https://github.com/shinahov/ufc-fight-prediction",
    "docsHtml": "\n  <div class=\"docs-text\">\n    <p><strong>Project Description:</strong><br>\n    This project builds a machine learning model to <strong>predict UFC fight outcomes</strong>. It automatically scrapes up-to-date fight data, cleans and prepares it, and then trains several models to estimate the winner probabilities.</p>\n\n    <p><strong>Technologies & Methods:</strong><br>\n    • <strong>Python</strong> for data processing and automation<br>\n    • <strong>pandas / NumPy</strong> for data cleaning and feature engineering<br>\n    • <strong>scikit-learn</strong> and <strong>XGBoost</strong> for training and evaluation<br>\n    • <strong>BeautifulSoup / requests</strong> for web scraping<br>\n    • <strong>Matplotlib</strong> for visualization</p>\n\n    <p><strong>Overview:</strong><br>\n    The pipeline fetches current UFC fight data from the web, processes fighter statistics, builds numerical features (reach, striking rate, win streaks, etc.), and evaluates model accuracy and feature importance to understand key predictors.</p>\n  </div>\n  ",
    "category": "Machine learning"
  },
  {
    "order": 3,
    "title": "Clustering with the B-Method",
    "summary": "Formal modeling of K-Means and Hierarchical Clustering (Single Linkage) in B, verified in ProB/SimB and visualized via VisB.",
    "tech": [
      "B-Method",
      "ProB",
      "SimB",
      "VisB",
      "Python"
    ],
    "tags": [
      "Python",
      "formal",
      "clustering",
      "visualization"
    ],
    "code": "https://github.com/shinahov/Clustering_B",
    "docsHtml": "\n  <div class=\"docs-gallery\">\n    <img class=\"image\" src=\"../images/K-means_B.png\" alt=\"K-Means model in B and VisB visualization\" />\n    <img class=\"image\" src=\"../images/K-means-py.png\" alt=\"K-Means clustering with Python and scikit-learn\" />\n  </div>\n\n  <div class=\"docs-text\">\n    <p><strong>Project Description:</strong><br>\n    This project demonstrates how classical clustering algorithms like <strong>K-Means</strong>, <strong>Hierarchical Clustering</strong> (Single Linkage), and <strong>Gaussian Mixture Models (GMM)</strong> can be formally specified and executed in the <strong>B-Method</strong>.\n    The goal is to show that data-driven algorithms can also be represented, verified, and visualized through <strong>formal methods</strong>.</p>\n\n    <p><strong>Concept and Implementation:</strong><br>\n    • Models are specified as <strong>B machines</strong> and animated/verified using <strong>ProB</strong> and <strong>SimB</strong>.<br>\n    • The system state and results are visualized in <strong>VisB</strong>.<br>\n    • <strong>Python</strong> and <strong>Java</strong> handle automation, data generation, and communication using <strong>JSON</strong>.<br>\n    • Comparative runs are performed using <strong>scikit-learn</strong> for validation.</p>\n\n    <p><strong>Technologies Used:</strong><br>\n    • B-Method (Formal Specification)<br>\n    • ProB / SimB (Model Checking & Simulation)<br>\n    • VisB (Visualization)<br>\n    • Python & Java (Integration & Automation)</p>\n\n    <p><strong>Purpose:</strong><br>\n    The project connects <strong>formal verification</strong> with <strong>machine learning concepts</strong>, demonstrating that clustering logic can be formally reasoned about and visually analyzed through the B-toolchain.</p>\n  </div>\n  ",
    "category": "Formal methods & machine learning"
  },
  {
    "order": 1,
    "title": "MockLang",
    "summary": "A hobby language and compiler built from scratch: source code becomes tokens, syntax trees, VM instructions, and an executable through NASM and GCC.",
    "tech": [
      "Python",
      "Compiler design",
      "Stack-based VM",
      "NASM / GCC"
    ],
    "tags": [
      "Python",
      "compilers",
      "language",
      "vm",
      "asm"
    ],
    "code": "https://github.com/shinahov/MockLang",
    "video": null,
    "docsHtml": "<h4>From syntax to execution</h4><p>Inspired by the Nand2Tetris course, MockLang explores the full compiler pipeline: tokenization, parsing, scoped symbol tables, semantic analysis, VM generation, and assembly generation.</p><p>The language supports classes, methods, control flow, and multiple return values. Its runtime uses a stack-based model.</p><h4>Example</h4><pre><code>class Person [name:String, age:int]:\n  fn main() -&gt; void:\n    create Person p = Person(\"Alice\", 30);\n    print(p.name);\n    print(p.age);\n  end\nend</code></pre><h4>Current scope</h4><p>The VM-to-assembly translator and executable build through NASM/GCC are implemented. This is an educational language with known issues, not a production toolchain.</p>",
    "category": "Compilers & language design"
  },
  {
    "order": 5,
    "title": "Bioinformatics · Rosalind",
    "summary": "Solving classical DNA-related problems from the Rosalind platform using Python.",
    "tech": [
      "Python",
      "bioinformatics"
    ],
    "tags": [
      "Python",
      "bioinformatics"
    ],
    "code": "https://github.com/shinahov/bioinformatics",
    "video": null,
    "docsHtml": "\n    <h4>Project Description</h4>\n    <p>This repository contains my solutions to various bioinformatics challenges \n    from the Rosalind platform. The goal is to practice DNA sequence processing, \n    GC-content analysis, complement generation, and other core concepts from \n    computational biology.</p>\n\n    <h4>Purpose</h4>\n    <p>I use this project to improve my bioinformatics skills and continuously \n    extend the repository with new tasks as I progress.</p>\n\n    <p><strong>Language:</strong> Python</p>\n  ",
    "category": "Algorithms & biology"
  },
  {
    "order": 2,
    "title": "DriveBy",
    "summary": "Prototype of an Uber-like map app with route-based matching: drivers already traveling A→B can pick up walkers near their route for a ride segment. Real-time simulation + live map visualization.",
    "tech": [
      "Python",
      "OSRM",
      "Leaflet",
      "WebSockets",
      "Geo Routing"
    ],
    "tags": [
      "Python",
      "web",
      "realtime",
      "routing",
      "maps"
    ],
    "code": "https://github.com/shinahov/DriveBy",
    "video": null,
    "docsHtml": "\n    <h4>Concept</h4>\n    <p>\n      Think of it as an “Uber-like” map app, but with a different idea:\n      drivers are <strong>already traveling from A → B</strong> (no dedicated ride start),\n      and walkers are going in a similar direction. The system inserts a <strong>ride segment</strong> into the walker’s trip:\n      walk → pickup → ride → dropoff → walk.\n    </p>\n\n    <div class=\"docs-gallery\">\n    <img class=\"image\" src=\"../images/map-navigation.png\" alt=\"Map navigation view\" />\n    <img class=\"image\" src=\"../images/pickup.png\" alt=\"Pickup\" />\n    <img class=\"image\" src=\"../images/simulation-view.png\" alt=\"simulation view\" />\n    </div>\n\n    <h4>Route Matching (Pickup & Dropoff)</h4>\n    <ul>\n      <li>Routes are fetched via <strong>OSRM</strong> (driving for drivers, walking for walkers).</li>\n      <li>Routes are stored as polylines: lists of <code>(lat, lon)</code> points.</li>\n      <li>Matching finds:\n        <ul>\n          <li>a pickup point on the driver route that minimizes walking distance from walker start</li>\n          <li>a later dropoff point that minimizes walking distance to walker destination</li>\n        </ul>\n      </li>\n      <li>“Best driver” selection is currently simple and based on travel/walking cost.</li>\n    </ul>\n\n    <h4>What’s implemented</h4>\n    <ul>\n      <li><strong>Backend simulation loop (Python):</strong> agents move along polylines over time (<code>t += dt</code>).</li>\n      <li><strong>Route + match computation:</strong> OSRM routing + prototype matching step.</li>\n      <li><strong>Frontend map (Leaflet):</strong> driver/walker positions, match routes, pickup/dropoff markers.</li>\n      <li><strong>Real-time updates:</strong> switching from polling to <strong>WebSockets</strong> (almost finished).</li>\n    </ul>\n\n    <h4>How it works (prototype architecture)</h4>\n    <ul>\n      <li>Backend receives “create agent” requests (driver/walker), computes routes, tries matching, updates positions each tick.</li>\n      <li>Frontend shows live state on a map (navigation-style follow/zoom + overview).</li>\n      <li>Matching logic is “good enough for a prototype”, not yet designed for high load.</li>\n    </ul>\n\n    <h4>Current Stage</h4>\n    <p>\n      WebSocket implementation is almost finished. The system works as a technical prototype, but UI/state transitions still need polishing.\n    </p>\n\n    <h4>Next steps</h4>\n    <ol>\n      <li><strong>Stabilize UI + simulation flow</strong> (state switches, unmatched → matched transitions, timing issues).</li>\n      <li><strong>Stable ID/session flow</strong> for multi-tab / multi-user usage (no collisions, clean transitions).</li>\n      <li><strong>Real GPS input from client</strong> (via JS browser geolocation) + real address selection instead of pinned start/destination.</li>\n      <li><strong>Persistence</strong> (sessions, agents, matches) so runs survive refresh/restart and map naturally to a DB model.</li>\n      <li><strong>Better matching for scale</strong> (spatial indexing, feasibility checks, fairer policies, stronger objective functions).</li>\n    </ol>\n  ",
    "category": "Routing & simulation"
  },
  {
    "order": 8,
    "title": "Cell Nuclei Segmentation",
    "category": "Computer vision",
    "summary": "A C++ and OpenCV exploration of microscopy image processing on BBBC039: intensity normalization, thresholding, mask cleanup, and connected-component analysis.",
    "tech": [
      "C++17",
      "OpenCV",
      "CMake",
      "BBBC039"
    ],
    "tags": [
      "c++",
      "bioinformatics"
    ],
    "code": "https://github.com/shinahov/bbbc039-cell-segmentation",
    "docsHtml": "<h4>Microscopy image processing</h4><p>The source loads 16-bit microscopy images and implements percentile normalization, Otsu thresholding, hole filling, morphological cleanup, connected components, and contour analysis.</p><h4>Scope</h4><p>An exploratory cell-segmentation project. The repository includes intermediate image outputs; no benchmark accuracy is claimed here.</p>"
  },
  {
    "order": 9,
    "title": "AI Tune & Refine",
    "category": "AI interfaces",
    "summary": "A full-stack learning project around conversational AI: a React and TypeScript chat interface with a Cloudflare Worker connecting it to Google’s generative AI API.",
    "tech": [
      "TypeScript",
      "React",
      "Vite",
      "Cloudflare Workers"
    ],
    "tags": [
      "web",
      "typescript"
    ],
    "code": "https://github.com/shinahov/Ai-tune-and-refine",
    "demo": "https://shinahov.github.io/Ai-tune-and-refine/",
    "docsHtml": "<h4>Architecture</h4><p>A Vite, React, and TypeScript frontend is hosted on GitHub Pages. A Cloudflare Worker proxies requests to the Google Generative Language API. The interface builds on assistant-ui.</p><h4>Current scope</h4><p>The README documents basic chat as implemented. Response tuning and inline text refinement are project goals, rather than features assumed complete.</p>"
  },
  {
    "order": 10,
    "title": "Exam Protocol Processing",
    "category": "Data preparation & search",
    "summary": "A Python document-processing prototype that turns unstructured medical exam reports into cases, sections, and question–answer data for a planned semantic-search workflow.",
    "tech": [
      "Python",
      "python-docx",
      "Text processing"
    ],
    "tags": [
      "python"
    ],
    "code": "https://github.com/shinahov/exam-dm-semantic-search",
    "docsHtml": "<h4>From documents to structured data</h4><p>The current implementation reads DOCX files, cleans text, detects case headers, separates sections, and extracts question–answer content.</p><h4>Current scope</h4><p>The repository describes semantic search as its goal. The visible source currently implements the document-preparation stage; it is not presented here as a finished retrieval engine.</p>"
  },
  {
    "order": 11,
    "title": "Algorithms for Sequence Analysis",
    "category": "Academic coursework",
    "summary": "Python coursework exploring algorithms for strings and biological sequences, including matching, alignment, indexing, compression, and approximate matching.",
    "tech": [
      "Python",
      "String algorithms",
      "Sequence analysis"
    ],
    "tags": [
      "python",
      "bioinformatics"
    ],
    "code": "https://github.com/shinahov/Algorithms-for-Sequence-Analysis-Assignments",
    "docsHtml": "<h4>Learning through implementation</h4><p>Personal solutions to programming assignments in Algorithms for Sequence Analysis. The course covers string and biological-sequence algorithms.</p><p>These are student solutions, not official reference implementations, and may contain mistakes.</p>"
  }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}

function projectExhibit(project) {
  const repo = new URL(project.code).pathname.split('/')[2];
  if (repo === 'MockLang') return `<figure class="project-visual"><div class="source-example"><p class="source-name">Example · MockLang</p><pre><code>create Person p =
  Person("Alice", 30);

print(p.name);
print(p.age);</code></pre></div><figcaption>Source → VM → NASM → executable</figcaption></figure>`;
  const screenshots = {
    DriveBy: ['map-navigation.png', 'Map navigation in the DriveBy prototype'],
    Clustering_B: ['K-means_B.png', 'K-Means model and VisB visualization']
  };
  if (!screenshots[repo]) return '';
  const [file, caption] = screenshots[repo];
  return `<figure class="project-visual"><a href="../images/${file}" target="_blank" rel="noopener noreferrer" aria-label="Open ${caption} at full size"><img src="../images/${repo === 'DriveBy' ? 'map-preview.webp' : file}" alt="${caption}" loading="lazy"></a><figcaption>${caption} · <a href="../images/${file}" target="_blank" rel="noopener noreferrer">Full size</a></figcaption></figure>`;
}

let showAllProjects = false;

function renderProjects(filter = 'all') {
  const grid = document.getElementById('projectGrid');
  const projects = projectData.filter(project => filter === 'all' || project.tags.some(tag => tag.toLowerCase() === filter)).sort((a,b) => a.order - b.order);
  grid.replaceChildren();
  const visible = filter === 'all' && !showAllProjects ? projects.slice(0, 3) : projects;
  for (const project of visible) {
    const article = document.createElement('article');
    const exhibit = projectExhibit(project);
    article.className = exhibit ? 'project-card featured' : 'project-card';
    article.id = 'project-' + new URL(project.code).pathname.split('/')[2].toLowerCase();
    article.innerHTML = `${exhibit}<div class="project-copy"><div class="project-meta">${escapeHtml(project.category || project.tech[0])}</div>
      <h3>${escapeHtml(project.title)}</h3><p class="project-summary">${escapeHtml(project.summary)}</p>
      <ul class="tags" aria-label="Technologies">${project.tech.map(tech => `<li>${escapeHtml(tech)}</li>`).join('')}</ul>
      <div class="card-actions"><a href="${escapeHtml(project.code)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(project.title)} source on GitHub">Source code</a>${project.demo ? `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer">Live demo</a>` : ''}</div></div>`;
    if (project.docsHtml || project.video) {
      const details = document.createElement('details');
      details.className = 'project-detail';
      const summary = document.createElement('summary');
      summary.textContent = 'Read project notes';
      summary.setAttribute('aria-label', `Project notes for ${project.title}`);
      const body = document.createElement('div');
      body.className = 'detail-body';
      body.innerHTML = project.docsHtml || '';
      body.querySelectorAll('img').forEach(img => { img.loading = 'lazy'; img.decoding = 'async'; });
      if (project.video) {
        const player = document.createElement('div');
        const videoId = new URL(project.video).searchParams.get('v');
        const link = document.createElement('a');
        link.href = project.video;
        link.textContent = 'Watch demonstration on YouTube';
        link.target = '_blank'; link.rel = 'noopener noreferrer';
        body.prepend(player, link);
        details.addEventListener('toggle', () => {
          player.replaceChildren();
          if (details.open && videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
            iframe.title = `${project.title} demonstration`;
            iframe.loading = 'lazy'; iframe.allowFullscreen = true;
            player.append(iframe);
          }
        });
      }
      details.append(summary, body);
      article.querySelector('.project-copy').append(details);
    }
    grid.append(article);
  }
  document.getElementById('projectCount').textContent = visible.length < projects.length ? `${visible.length} of ${projects.length} projects` : `${projects.length} project${projects.length === 1 ? '' : 's'}`;
  const more = document.getElementById('moreProjects');
  more.hidden = filter !== 'all';
  more.textContent = showAllProjects ? 'Show fewer projects' : `View the other ${projectData.length - visible.length} projects`;
  more.setAttribute('aria-expanded', String(showAllProjects));
}

function applyTheme(mode) {
  const dark = mode === 'dark';
  document.documentElement.classList.toggle('theme-dark', dark);
  const button = document.getElementById('themeToggle');
  button.textContent = dark ? 'Light mode' : 'Dark mode';
  button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  try { localStorage.setItem('theme', mode); } catch { /* Storage is optional. */ }
}

document.addEventListener('DOMContentLoaded', () => {
  let theme = 'light';
  try { theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch { /* Use the light palette. */ }
  applyTheme(theme);
  document.getElementById('themeToggle').addEventListener('click', () => applyTheme(document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark'));
  document.getElementById('projectFilter').addEventListener('change', event => renderProjects(event.target.value));
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('moreProjects').addEventListener('click', () => {
    showAllProjects = !showAllProjects;
    renderProjects();
    const target = showAllProjects ? document.querySelectorAll('.project-card h3')[3] : document.getElementById('projects-title');
    target.setAttribute('tabindex', '-1');
    target.focus({preventScroll:true});
    target.scrollIntoView({block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  function revealLinkedProject() {
    if (!location.hash.startsWith('#project-')) return;
    showAllProjects = true;
    document.getElementById('projectFilter').value = 'all';
    renderProjects();
    document.getElementById(location.hash.slice(1))?.scrollIntoView({block:'start'});
  }
  renderProjects();
  revealLinkedProject();
  window.addEventListener('hashchange', revealLinkedProject);
});

