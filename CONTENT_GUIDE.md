# Updating site content

The site uses Jekyll to generate static HTML for GitHub Pages. Entries are
ordered newest first and share reusable CSS classes from `assets/home.css`.

The four published pages are `index.html`, `publications.html`, `talks.html`,
and `service.html`. Each page contains only its own content and a small YAML
front matter block. Shared markup lives in:

- `_layouts/default.html`: document shell and page layout
- `_includes/header.html`: logo and navigation
- `_includes/profile.html`: portrait, affiliation, email, and profile links

Edit a shared file once to update every generated page. The `nav` value in a
page's front matter controls which navigation link is highlighted.

## Publications

Edit `publications.html`. Inside `<div class="publication-years">`, add a new
year section above the older years, or add an article at the top of an existing
year's `<div class="publication-entries">`.

```html
<section class="publication-year" aria-labelledby="year-2027">
  <h3 id="year-2027">2027</h3>
  <div class="publication-entries">
    <article class="publication-entry">
      <h4>Publication title</h4>
      <p>Author, A.; <strong>Hemmer, J. V.</strong>; Author, B.</p>
      <p class="publication-journal">
        <a href="https://doi.org/example"><em>Journal Name</em></a>
      </p>
    </article>
  </div>
</section>
```

## Talks and posters

Edit `talks.html`. Oral talks are in the first `presentation-group`; posters
are in the group headed **Posters**. Add a new `talk-year` when needed, or add
an entry at the top of an existing year's `talk-entries` container.

```html
<article class="talk-entry">
  <!-- Include this line only for a future presentation. -->
  <p class="talk-status">Upcoming</p>
  <h5 class="talk-event">Conference or meeting</h5>
  <p class="talk-title">Presentation title</p>
  <p>City, State or Country</p>
  <p>Month Day, Year</p>
</article>
```

The location and date automatically use the standardized tight spacing.

## Education

Edit `index.html`. Add entries inside `<div class="education-list">`.

```html
<article class="education-entry">
  <div>
    <h3>
      Degree and field
      <span class="education-year">Completion year</span>
    </h3>
    <p class="entry-institution">Institution</p>
    <p class="education-thesis">Thesis: Thesis title</p>
    <p>Advisor: Name, Ph.D.</p>
  </div>
</article>
```

Omit the thesis line when it is not applicable. Use `Present` for an ongoing
degree.

## Scientific notation

Use HTML subscripts when helpful: `CO<sub>2</sub>` renders as CO₂.

## Service and outreach

Edit `service.html`. Add journals to `journal-list`, and add outreach activities
to `outreach-list` in newest-first order.

```html
<article class="outreach-entry">
  <h3>Role</h3>
  <p class="outreach-title">Activity title, when applicable</p>
  <p>Organization and location</p>
  <p>Month Day, Year</p>
</article>
```

## Preview

Install Ruby, Bundler, and the platform prerequisites first. On Ubuntu, the
[official Jekyll guide](https://jekyllrb.com/docs/installation/ubuntu/)
recommends `ruby-full`, `build-essential`, and `zlib1g-dev`. Then install the
project dependencies once:

```bash
bundle config set --local path vendor/bundle
bundle install
```

Then start the local preview server:

```bash
bundle exec jekyll serve --livereload
```

Open `http://127.0.0.1:4000/`. Jekyll rebuilds the generated `_site` directory
when source files change; `--livereload` also refreshes the browser.

`python3 -m http.server` can still serve the generated `_site` directory, but
it cannot process Liquid includes or layouts directly.
