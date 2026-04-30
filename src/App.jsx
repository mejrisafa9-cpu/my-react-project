// ═══════════════════════════════════════════════════════════════
//  GLOBAL DATA  (module-level — outside every component)
//
//  Why keep stories here?
//  • It is static for now, so no component "owns" it yet.
//  • Every component in this file can read it via JS lexical
//    scoping without any prop-passing.
//  • Not scalable for real apps: globals are not reactive, cannot
//    be updated via setState, and become hard to trace in large
//    codebases. The next step is moving data into App's state and
//    passing it down as props.
// ═══════════════════════════════════════════════════════════════
const stories = [
  {
    objectID: "37510853",
    title: "Bun 1.0 – a fast all-in-one JavaScript runtime",
    url: "https://bun.sh/blog/bun-v1.0",
    author: "jarredsumner",
    points: 2041,
    num_comments: 614,
  },
  {
    objectID: "37371084",
    title: "An Interactive Intro to CRDTs",
    url: "https://jakelazaroff.com/words/an-interactive-intro-to-crdts/",
    author: "jakelazaroff",
    points: 950,   // bumped from 876 in the previous lab
    num_comments: 102,
  },
  {
    objectID: "37629873",
    title: "Htmx 1.9.5 released",
    url: "https://htmx.org/posts/2023-09-01-htmx-1-9-5-is-released/",
    author: "bigskysoftware",
    points: 543,
    num_comments: 231,
  },
  {
    objectID: "38012456",
    title: "Why Signals Are Better Than useState for Complex State",
    url: "https://dev.to/signals-deep-dive",
    author: "signalsnerd",
    points: 388,
    num_comments: 47,
  },
];


// ═══════════════════════════════════════════════════════════════
//  Step 5 – Header component (Mini Challenge)
//
//  Responsibility: display the app's brand / page title.
//  It needs no data at all — pure presentational markup.
// ═══════════════════════════════════════════════════════════════
function Header() {
  return (
    <header className="app-header">
      <h1>📰 Hacker News Reader</h1>
      <p className="tagline">Top stories, curated for developers</p>
    </header>
  );
}


// ═══════════════════════════════════════════════════════════════
//  Step 3 – Search component
//
//  Responsibility: render the search label + input field.
//  It does NOT filter anything yet — that comes when we add
//  state and props in the next lab.
//
//  Does Search need access to `stories` right now?
//    → No. Its only job is to display a form element.
//       The global `stories` variable is irrelevant here.
//
//  Think Before You Code:
//    • Why htmlFor instead of for?
//      "for" is a reserved JS keyword; JSX uses htmlFor.
// ═══════════════════════════════════════════════════════════════
function Search() {
  return (
    <div className="search-container">
      <label htmlFor="search">Search stories:</label>
      <input
        id="search"
        type="text"
        placeholder="e.g. React, Bun, htmx…"
      />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
//  Step 1 – List component
//
//  Responsibility: iterate over `stories` and render each item.
//
//  Why does List still have access to `stories` without props?
//    → JS lexical scoping: `stories` is declared at module level,
//      so every function in this file — including List — can read
//      it. The component doesn't need to receive it via props
//      because it's in the same scope.
//
//  Is this scalable?
//    → No. Accessing a global inside a component creates a hidden
//      dependency that makes the component hard to test, reuse, or
//      reason about. The scalable solution is to pass data as a
//      prop: <List stories={stories} />.  We'll do that next lab.
// ═══════════════════════════════════════════════════════════════
function List() {
  return (
    <ul className="story-list">
      {stories.map((story) => (
        // Key must be on the TOP-LEVEL element returned by map().
        // objectID is preferred over index: it stays stable even
        // if items are deleted or reordered. Using the index would
        // cause React to mix up nodes and produce subtle UI bugs.
        <li key={story.objectID} className="story-item">

          {/* Title as a clickable link — opens in a new tab */}
          <h3>
            <a
              href={story.url || "#"}
              target="_blank"
              rel="noreferrer"
            >
              {story.title}
            </a>
          </h3>

          {/* Author · points · comments using semantic <span> */}
          <p>
            By <span className="author">{story.author}</span>
            {" · "}
            <span className="points">{story.points} points</span>
            {" · "}
            <span className="comments">{story.num_comments} comments</span>
          </p>

        </li>
      ))}
    </ul>
  );
}


// ═══════════════════════════════════════════════════════════════
//  Step 2 – App component  (orchestrator / shell)
//
//  Responsibility: compose the page by placing child components
//  in the right order. App no longer contains any data logic or
//  rendering detail — it just assembles the pieces.
//
//  Think Before You Code:
//    • What if you forget <List />?
//      App renders without errors, but no stories appear —
//      the UI is silently incomplete.
//    • Who is responsible for rendering stories now?
//      The List component owns that responsibility.
// ═══════════════════════════════════════════════════════════════
function App() {
  return (
    <div className="app-container">
      {/* Step 5 – Header renders the app title */}
      <Header />

      {/* Step 3 – Search renders the search field */}
      <Search />

      {/* Step 1 + 2 – List renders all stories */}
      <List />
    </div>
  );
}

export default App;


// ═══════════════════════════════════════════════════════════════
//  Step 4 – Reflection
// ═══════════════════════════════════════════════════════════════

// 1. WHAT DOES App DO NOW?
//    App is a pure orchestrator — it composes the page by
//    rendering Header, Search, and List in the correct order.
//    It contains zero data logic and zero rendering detail.
//    Think of it as the "table of contents" of the UI.

// 2. WHAT DOES List DO?
//    List owns a single responsibility: iterate over the global
//    `stories` array with map() and produce one <li> per story,
//    with its title link, author, points, and comment count.

// 3. WHAT DOES Search DO?
//    Search renders the search label + input element. Right now
//    it is purely presentational — it shows the UI widget but
//    doesn't filter anything yet. In the next lab it will receive
//    a value and an onChange handler via props.

// 4. WHY IS THIS STRUCTURE CLEANER THAN BEFORE?
//    Each component now has ONE clear job (Single Responsibility
//    Principle). App.jsx is easier to read: you see the page
//    structure at a glance just by reading App's return value.
//    Individual components can be developed, tested, and debugged
//    in isolation without touching the others.