'use strict';

/*
 * Personal texts for the "About me" and "Experience" pages.
 * To add or change a job, edit the JOBS or EDUCATION list below — the HTML is built automatically.
 */

const ABOUT_HTML = `
  <p>I started my Computer Science bachelor’s at HHU Düsseldorf in 2021 and completed it in 2025. I returned for my master’s in February 2026.</p>
  <p>Alongside my studies, I’ve worked in database development and business intelligence, and tutored databases and computer networks. I work on a Java backend at Mineral Minds until November 2026, where I refactored the data-access layer. I am already looking for my next working student role.</p>
  <p>MockLang began after a Nand2Tetris course. I wanted to see how hard it actually is to turn a small piece of code into an executable.</p>
  <dl class="facts">
    <div><dt>Programming</dt><dd>Java, Python, C, C++, SQL</dd></div>
    <div><dt>Languages</dt><dd>German, English, Russian, Kabardian</dd></div>
    <div><dt>Location</dt><dd>Solingen, North Rhine-Westphalia</dd></div>
  </dl>`;

// Each entry: dates, title, organization, optional detail line. Text may contain HTML (e.g. &amp;).
const JOBS = [
  {
    dates: 'Jul 2026 — Present',
    title: 'Working Student Software Developer · Java',
    organization: 'Mineral Minds',
    detail: 'Working student · Remote',
  },
  {
    dates: 'Apr — Jul 2026',
    title: 'Working Student · Business Intelligence',
    organization: 'CFP Brands Süßwarenhandels GmbH &amp; Co. KG',
    detail: 'Düsseldorf · Hybrid',
  },
  {
    dates: 'Nov 2024 — Jun 2025',
    title: 'Database Developer',
    organization: 'SQL Service',
    detail: 'Wuppertal',
  },
  {
    dates: 'Apr — Oct 2024',
    title: 'Tutor · Computer Networks',
    organization: 'Heinrich Heine University Düsseldorf',
  },
  {
    dates: 'Apr — Oct 2022',
    title: 'Tutor · Databases',
    organization: 'Heinrich Heine University Düsseldorf',
  },
];

const EDUCATION = [
  {
    dates: 'Feb 2026 — Present',
    title: 'Master’s · Computer Science',
    organization: 'Heinrich Heine University Düsseldorf',
    detail: 'Expected completion: March 2028',
  },
  {
    dates: 'Oct 2021 — Nov 2025',
    title: 'Bachelor’s · Computer Science',
    organization: 'Heinrich Heine University Düsseldorf',
  },
];

function timelineItemHtml({ dates, title, organization, detail }) {
  return `
    <article class="timeline-item">
      <p class="timeline-date">${dates}</p>
      <div>
        <h3>${title}</h3>
        <p class="organization">${organization}</p>
        ${detail ? `<p>${detail}</p>` : ''}
      </div>
    </article>`;
}

const EXPERIENCE_HTML = `
  <h3 class="timeline-group-title">Professional experience</h3>
  ${JOBS.map(timelineItemHtml).join('')}
  <h3 class="timeline-group-title">Education</h3>
  ${EDUCATION.map(timelineItemHtml).join('')}`;

// Used by main.js.
const personalContent = {
  about: ABOUT_HTML,
  experience: EXPERIENCE_HTML,
};
