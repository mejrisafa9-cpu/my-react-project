// ─────────────────────────────────────────────
//  Step 3 – Variable defined OUTSIDE the component
//  Accessible inside App because of JS lexical scoping.
//  In a real app this is risky: the value is global,
//  shared across every render, and not reactive.
// ─────────────────────────────────────────────
const courseTitle = "React Fundamentals";

// ─────────────────────────────────────────────
//  Step 7 – Function defined outside (could also
//  live inside the component)
// ─────────────────────────────────────────────
function sayHello(name) {
  // Returns a greeting string based on studentName (bonus ⚡)
  return `Hey ${name}, welcome aboard! 🚀`;
}

// ─────────────────────────────────────────────
//  Step 1 – Functional component (capital letter
//  because React distinguishes components from
//  plain HTML tags by their first letter's case)
// ─────────────────────────────────────────────
function App() {
  // Step 2 – Variable INSIDE the component
  const studentName = "Safa";

  // Step 6 – Object inside the component
  //  We cannot render {student} directly – React
  //  doesn't know how to serialise a plain object
  //  and will throw:
  //  "Objects are not valid as a React child"
  const student = {
    name: "Safa",
    age: 22,
    track: "Frontend Development",
  };

  // ── JSX must return ONE parent element (Step 1) ──
  return (
    <div className="container">

      {/* Step 1 – Custom <h1> */}
      <h1>My First React Lab 🎉</h1>

      {/* Step 2 – Variable inside JSX */}
      {/* Without {} React treats it as plain text and prints the literal word "studentName" */}
      <p>Student: {studentName}</p>

      {/* Step 3 + Step 4 – Dynamic sentence using both variables */}
      <p>Welcome to <strong>{courseTitle}</strong>, {studentName}!</p>

      {/* Step 5 – Form elements */}
      {/* React uses htmlFor (not for) because "for" is a reserved JS keyword */}
      <div className="form-group">
        <label htmlFor="feedback">Share your feedback:</label>
        <input id="feedback" type="text" placeholder="Type here…" />
      </div>

      {/* Step 6 – Displaying individual object properties */}
      <ul>
        <li>Name : {student.name}</li>
        <li>Age  : {student.age}</li>
        <li>Track: {student.track}</li>
      </ul>

      {/* Step 7 – Calling the function */}
      {/* {sayHello}  → would display the function's source code (a reference, not a call) */}
      {/* {sayHello()} → invokes it and displays the returned string ✅           */}
      <p>{sayHello(studentName)}</p>

    </div>
  );
}

export default App;

// ─────────────────────────────────────────────
//  Step 8 – Reflection
// ─────────────────────────────────────────────

// 1. ONE THING I UNDERSTAND WELL
//    How JSX bridges HTML and JavaScript: wrapping any JS
//    expression in {} lets me embed dynamic values, call
//    functions, or access object properties right inside
//    what looks like HTML markup.

// 2. ONE THING THAT IS STILL CONFUSING
//    The boundary between variables that belong inside vs.
//    outside the component. I understand that outside means
//    "module-level / shared", but I'm still building
//    intuition for when that's actually useful vs. when I
//    should use props or state instead.

// 3. ONE MISTAKE I MADE AND FIXED
//    I first tried to render the whole `student` object with
//    {student} and got the React error:
//    "Objects are not valid as a React child."
//    The fix was to access each property individually:
//    {student.name}, {student.age}, {student.track}.