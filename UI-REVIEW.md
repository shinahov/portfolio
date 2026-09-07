# UI review — 7 September 2026

Reviewed the actual site in Microsoft Edge via Playwright at 1440, 1024, 390, and 320 pixels. Inspected desktop/mobile screenshots and the experience section. Baseline: 12d2242.

## Findings and changes

| Priority | Aspect | Finding | Action |
| --- | --- | --- | --- |
| High | Mobile hierarchy | Navigation wraps the theme action onto a mostly empty row. The large profile delays project content beyond the first 900px. | Put theme beside the wordmark; shorten mobile profile and introduction. |
| High | Information architecture | 11 equally expanded entries create an 8,522px mobile page; experience is buried. | Show three leading projects initially, with an explicit control for the remaining eight. Filters continue to expose every matching project. |
| Medium | Interaction hierarchy | Notes are detached from the relevant source actions, especially beside large screenshots. | Keep notes and source actions within the project copy column. |
| Medium | Readability | Metadata is often 12px and source actions 13px. | Raise technical labels and actions to 14px; keep body copy at 16px. |
| Medium | Image usefulness | Detailed screenshots cannot be inspected at thumbnail size. | Link screenshots to full-resolution local images with explicit labels. |
| Medium | Touch accessibility | Text links have tight hit areas. | Give primary navigation and project actions at least 44px height, and adequate separation. |
| Medium | Responsive rhythm | Compact project rows retain sparse two-column arrangements at intermediate widths. | Stack compact entries sooner; reduce oversized vertical gaps on phones. |
| Low | Content clarity | The introductory text and role use more lines than needed. | Use concise factual wording; preserve verified education, employment, and project scopes. |

## Keep

The forest/white palette, actual project evidence, unboxed project rows, working native disclosure controls, semantic headings, and source links are appropriate. No invented metrics or testimonials are needed. The observed page has no document-level horizontal overflow at the four baseline widths.

## Verification plan

Recheck desktop/mobile screenshots, both themes, category filtering, show-all/show-less behavior, direct project links, keyboard navigation, notes, video lifecycle, images, reduced motion, and 200% text enlargement. Record measured outcomes after changes. No remote push or publishing.
