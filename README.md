# Personal Academic Website

This is the personal academic website of Shikun Qin.

## Structure
- `index.html`: Home page
- `book.html`: Book page
- `research.html`: Research page
- `teaching.html`: Teaching page
- `experience.html`: Web curriculum vitae
- `styles.css`: Stylesheet (design tokens, light/dark themes, layout, print styles)
- `script.js`: Theme toggle, scroll behaviour, figure lightbox
- `favicon.svg`: Site icon
- `robots.txt`, `sitemap.xml`: Search-engine files
- `images/`: Images
- `pdf/`: Curriculum vitae and book preview

## Features
- Light and dark themes. The theme follows the operating-system setting and can
  be overridden with the toggle in the navigation bar; the choice is stored in
  `localStorage` and applied before first paint to avoid a flash.
- Figures on the book page open in a lightbox; each also keeps a plain
  "view full-size" link, so the page works without JavaScript.
- Structured data (schema.org `Person` and `Book`) and Open Graph tags on every page.
- Responsive down to small phones, with a print stylesheet for the CV page.

## Editing notes
- Colours, spacing, and type are defined as custom properties at the top of
  `styles.css`. Changing a token updates both themes consistently.
- `styles.css` and `script.js` are linked with a `?v=` query string. Bump it
  when either file changes so returning visitors get the new version.
- Content that fades in on scroll carries the `reveal` class. The hidden state is
  scoped to `.js`, so the content stays visible if scripting is unavailable.

## Deployment
This website is deployed using GitHub Pages.
