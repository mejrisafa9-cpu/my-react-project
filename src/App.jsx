// ─────────────────────────────────────────────────────────────
//  Step 1 – Understanding the Data Structure
//
//  Each news story object looks like this:
//
//  {
//    objectID    : "37510853",   // unique identifier  ← React KEY
//    title       : "Article title here",
//    url         : "https://example.com/article",
//    author      : "username",
//    points      : 312,          // number (popularity score)
//    num_comments: 87,           // number
//  }
//
//  Which property should be the React key?
//    → objectID. It is guaranteed to be unique and stable —
//      it never changes even if the list is re-sorted or
//      new items are added.
//
//  Why is this structure realistic for an API?
//    → It mirrors exactly what the Hacker News Algolia API
//      returns (/api/v1/search). Real-world APIs always
//      include a stable unique ID (objectID, id, _id …)
//      and mix numeric scores with string metadata.
// ─────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────
//  Step 2 – Fake data defined OUTSIDE the component
//
//  Why outside?
//    • It is static — it never changes, so it doesn't need
//      to be re-created on every render.
//    • Keeping it at module level makes it easy to swap out
//      later: we'll just delete this array and fetch from
//      the API instead.
//
//  What will change when data comes from the API?
//    • This array will be replaced by a useState() call
//      (so React can trigger a re-render when data arrives)
//      and a useEffect() that fetches from the HN endpoint.
// ─────────────────────────────────────────────────────────────
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
    points: 876,    // ← Step 6: bumped to 950 below
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
  // Step 6 – New story added
  {
    objectID: "38012456",
    title: "Why Signals Are Better Than useState for Complex State",
    url: "https://dev.to/signals-deep-dive",
    author: "signalsnerd",
    points: 388,
    num_comments: 47,
  },
];

// Step 6 – Increase points of the second story and verify the UI updates
stories[1].points = 950;


// ─────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────
function App() {

  // Step 3 – Debug moment: log one story to the console
  // so we can inspect its structure before rendering.
  console.log("First story object →", stories[0]);

  return (
    <div className="app-container">
      <h1>Hacker News Stories</h1>

      {/*
        Step 3 – Render the list with map()
        ────────────────────────────────────
        • map() returns a NEW array of JSX elements — that's
          why it works inside JSX (JSX can render arrays).
        • forEach() returns undefined, so it cannot be used
          here; we need the transformed array that map() gives us.
      */}
      <ul className="story-list">
        {stories.map((story) => {

          /*
            Step 5 – Key prop
            ─────────────────
            The key goes on the TOP-LEVEL element returned by map().

            Why objectID and NOT the array index?
            • If items are deleted or reordered, indexes shift,
              so React would mis-identify nodes and force
              unnecessary DOM updates (or lose input state).
            • objectID is stable and unique — React knows exactly
              which item changed.

            Intentional test (Step 5):
            Remove key={story.objectID} → console shows:
            "Warning: Each child in a list should have a unique key prop."
          */
          return (
            <li key={story.objectID} className="story-item">

              {/* Step 4 – Title as a clickable link */}
              {/* Opens in a new tab; falls back to "#" if url is missing */}
              <h3>
                <a
                  href={story.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  {story.title}
                </a>
              </h3>

              {/* Step 4 – Author, points, comments with semantic HTML */}
              <p>
                By <span className="author">{story.author}</span>
                {" · "}
                <span className="points">{story.points} points</span>
                {" · "}
                <span className="comments">{story.num_comments} comments</span>
              </p>

            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;


// ─────────────────────────────────────────────────────────────
//  Step 7 – Reflection
// ─────────────────────────────────────────────────────────────

// 1. WHY IS map() ESSENTIAL FOR RENDERING LISTS IN REACT?
//    JSX only accepts expressions, not statements. map() is an
//    expression — it returns a new array of JSX nodes that React
//    can render. forEach() returns undefined, so there would be
//    nothing to display. map() is also declarative: "transform
//    every story into a <li>" reads exactly like what we intend.

// 2. WHY IS objectID THE CORRECT KEY?
//    A key must be (a) unique among siblings and (b) stable
//    across re-renders. objectID comes from the data source and
//    never changes even if the list is filtered or reordered.
//    Using the array index would break if items are removed or
//    shuffled because React would re-map stale keys to the wrong
//    DOM nodes, causing subtle bugs and unnecessary re-renders.

// 3. WHAT WILL CHANGE WHEN WE REPLACE FAKE DATA WITH THE API?
//    Three things:
//    a) The `stories` constant at module level goes away.
//    b) We add: const [stories, setStories] = useState([])
//       so React re-renders the list once data arrives.
//    c) We add: useEffect(() => {
//         fetch("https://hn.algolia.com/api/v1/search?query=react")
//           .then(res => res.json())
//           .then(data => setStories(data.hits));
//       }, [])
//    The JSX rendering block (the map) stays exactly the same —
//    that's the benefit of separating data from presentation.