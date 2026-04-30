// ═══════════════════════════════════════════════════════════════
//  GLOBAL DATA
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
    points: 950,
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
//  Step 1 – Header  →  arrow function, concise body (Step 3)
//
//  Syntax difference vs. function declaration:
//    Before: function Header() { return (...); }
//    After:  const Header = () => (...);
//
//  The return statement is removed in concise body form.
//  Parentheses () around the JSX are required when the JSX
//  spans multiple lines — without them JS inserts a semicolon
//  after the arrow and the function returns undefined silently.
// ═══════════════════════════════════════════════════════════════
const Header = () => (
  <header className="app-header">
    <h1>📰 Hacker News Reader</h1>
    <p className="tagline">Top stories, curated for developers</p>
  </header>
);


// ═══════════════════════════════════════════════════════════════
//  Step 1 + Step 4 – Search  →  arrow function, BLOCK body
//
//  Step 4: We switch from concise body back to block body
//  (with explicit `return`) because we need to declare a
//  handler function BEFORE the return statement.
//  Concise body has no room for extra statements — it is a
//  single expression only.
//
//  Step 5 – Event handler
//  • onChange fires on every keystroke (every change to the
//    input value), not just on blur or form submit.
//  • The handler receives a synthetic event object `e`.
//    e.target is the DOM input element.
//    e.target.value is the string the user typed so far.
//  • We do NOT introduce state yet — the value is only logged.
// ═══════════════════════════════════════════════════════════════
const Search = () => {

  // Step 5 + Step 7 – handler as an arrow function
  // Step 7: logs only the value (not the full event object)
  // and adds a second console.log message.
  const handleChange = (e) => {
    console.log("Input value →", e.target.value);           // Step 7a
    console.log("Characters typed:", e.target.value.length); // Step 7b
  };

  return (
    <div className="search-container">
      <label htmlFor="search">Search stories:</label>
      <input
        id="search"
        type="text"
        placeholder="e.g. React, Bun, htmx…"
        onChange={handleChange}  // Step 5: onChange, no state yet
      />
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
//  Step 1 + Step 2 + Step 3 – List
//
//  Component itself → arrow function, concise body.
//  map() callback   → arrow function, concise body (Step 2+3).
//
//  Step 2: map((story) => { return <li>…</li>; })
//  Step 3: map((story) => (           ← concise, no return
//            <li>…</li>
//          ))
//
//  When can you remove `return`?
//    Only when the function body is a SINGLE expression.
//    As soon as you need an if-statement, a variable, or any
//    other statement, you must switch back to block body + return.
// ═══════════════════════════════════════════════════════════════
const List = () => (
  <ul className="story-list">
    {stories.map((story) => (
      // key on the TOP-LEVEL element; objectID preferred over index
      <li key={story.objectID} className="story-item">

        <h3>
          <a href={story.url || "#"} target="_blank" rel="noreferrer">
            {story.title}
          </a>
        </h3>

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


// ═══════════════════════════════════════════════════════════════
//  Step 1 – App  →  arrow function, concise body
//
//  App remains the pure orchestrator: it only composes the
//  three child components. Nothing else changed functionally.
// ═══════════════════════════════════════════════════════════════
const App = () => (
  <div className="app-container">
    <Header />
    <Search />
    <List />
  </div>
);

export default App;


// ═══════════════════════════════════════════════════════════════
//  Step 6 – Browser DevTools Observations
//
//  • Logging occurs on EVERY keystroke — onChange fires each
//    time the input value changes, not on form submit.
//  • The object logged (before Step 7) is a SyntheticEvent:
//    React's cross-browser wrapper around the native DOM event.
//  • The property that contains the typed value is:
//      e.target.value   (e.target is the <input> DOM node)
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
//  Step 8 – Reflection
// ═══════════════════════════════════════════════════════════════

// 1. WHEN DO WE USE CONCISE BODY ARROW FUNCTIONS?
//    When the function body is a single expression whose value
//    is the return value — no variables, no conditionals, no
//    side effects before the return. Ideal for: short callbacks
//    (map, filter), purely presentational components (Header,
//    List), one-liner utility helpers.

// 2. WHEN DO WE USE BLOCK BODY ARROW FUNCTIONS?
//    Whenever we need to do MORE than return one expression:
//    • Declare intermediate variables (const x = …)
//    • Call side-effect functions before returning (console.log)
//    • Use if / switch / try-catch logic
//    • Add future logic (Search will soon manage state)
//    Rule of thumb: if you think "I'll need to add something
//    here soon", start with block body.

// 3. WHAT DOES AN EVENT OBJECT CONTAIN?
//    A SyntheticEvent wrapping the native browser event. Key
//    properties relevant to input handling:
//      e.target          → the DOM element that triggered the event
//      e.target.value    → current string value of the input
//      e.target.name     → the name attribute (useful for forms)
//      e.type            → event type: "change", "click", etc.
//      e.preventDefault()→ method to stop default browser behaviour
//      e.stopPropagation()→ method to stop event bubbling