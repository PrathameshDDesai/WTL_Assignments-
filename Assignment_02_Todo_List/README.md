# Assignment 02: Dynamic To-Do List Web Application

[![Live Demo](https://img.shields.io/badge/Render-Live%20Demo-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://wtl-assignment-02-todolist.onrender.com/)

**🌐 Live Deployment URL:** [https://wtl-assignment-02-todolist.onrender.com/](https://wtl-assignment-02-todolist.onrender.com/)

---

## 1. Title
Create a dynamic To-do List web application with interactive task management and client-side persistence using HTML5, CSS3, and JavaScript (ES6).

## 2. Objectives
- To master DOM selection and dynamic DOM element manipulation (`createElement`, `innerHTML`, event delegation).
- To implement event listeners for forms, buttons, checkboxes, and keyboard inputs.
- To use the browser's `localStorage` API for state persistence across sessions.
- To compute dynamic stats such as progress percentage and active/completed item counters.

## 3. Problem Statement
Create a dynamic To-do List web application using HTML, CSS, and JavaScript that allows users to create tasks, assign priorities, set due dates, categorize, filter, edit, mark as complete, and delete tasks with automatic local storage saving.

## 4. Theoretical Concepts
1. **DOM Tree Manipulation**: Dynamically injecting list nodes and toggling CSS classes based on user interaction.
2. **Web Storage API (`localStorage`)**: Synchronous client-side key-value storage (`JSON.stringify` and `JSON.parse`) to maintain state.
3. **Array Methods**: Utilizing `.map()`, `.filter()`, and `.unshift()` to update application state in an immutable/clean manner.
4. **Event Delegation**: Handling click and change events seamlessly on dynamically generated elements.

## 5. Algorithm / Flowchart
1. On page load, retrieve existing task JSON array from `localStorage` (or initialize with default sample tasks).
2. Render task list to DOM while recalculating the progress bar, completion percentage, and active counts.
3. **Add Task**:
   - Capture user inputs (title, priority, category, due date).
   - Validate that the title is non-empty.
   - Construct task object with unique timestamp ID and append to tasks array.
   - Save to `localStorage` and re-render.
4. **Toggle Status**:
   - On checkbox toggle, flip `completed: !completed`.
   - Update styles (strikethrough & opacity) and refresh stats.
5. **Filter / Search**:
   - Filter items dynamically based on active filter tab (`all`, `active`, `completed`) and matching search query substring.
6. **Edit / Delete**:
   - Open modal overlay with pre-populated values to allow inline editing.
   - Delete removes the object from the array by ID after user confirmation.

## 6. Test Cases
| Test ID | Test Scenario | Expected Outcome | Status |
|:---|:---|:---|:---|
| TC_01 | Add a new task with High priority and due date | Task is prepended to the list with red badge and due date badge | Passed |
| TC_02 | Refresh the web browser | All previously entered tasks remain intact via `localStorage` | Passed |
| TC_03 | Click the completion checkbox of a task | Task title gets strikethrough, progress percentage updates immediately | Passed |
| TC_04 | Click "Active" filter tab | Only uncompleted tasks are shown in the list | Passed |
| TC_05 | Type keyword in search box | Filter updates in real-time, showing only matching task titles/categories | Passed |
| TC_06 | Click Edit, modify task name, and submit modal | Task updates in DOM and local storage | Passed |

## 7. Conclusion
Successfully implemented a dynamic, feature-rich To-Do List web application utilizing modern JavaScript (ES6+), interactive DOM manipulation, and HTML5 LocalStorage persistence.

## 8. References
- MDN Web Docs: Working with the DOM
- MDN Web Docs: Window.localStorage
