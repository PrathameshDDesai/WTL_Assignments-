# Assignment 05: React Functional Components, JSX, Props & `useState` Hook

## 1. Title
Create a React application using JSX with functional components, passing data using props and managing dynamic state using the `useState` hook.

## 2. Objectives
- To understand React's declarative component architecture.
- To use JSX (JavaScript XML) for templating UI components.
- To demonstrate unidirectional data flow by passing data and callback handlers via `props`.
- To manage local and lifted component state using the `useState` React Hook.

## 3. Problem Statement
Create a React application using JSX with functional components. Pass data using props and manage state using the useState hook for an educational course enrollment dashboard that supports category filtering, keyword searching, and cart state synchronization.

## 4. Theoretical Concepts
1. **Functional Components**: Plain JavaScript functions returning JSX representing the view hierarchy.
2. **JSX**: Syntax extension to JavaScript allowing HTML-like markup directly within JS logic.
3. **Props (Properties)**: Read-only inputs passed from parent components to child components to configure presentation and pass callbacks.
4. **`useState` Hook**: Enables functional components to retain and update stateful values across render cycles.

## 5. Algorithm / Flowchart
1. Initialize the root React component `App` managing:
   - `courses`: Array of available curriculum objects.
   - `selectedCategory` & `selectedLevel`: Active filter states.
   - `searchKeyword`: Filter query string.
   - `enrolledList`: Array of enrolled courses.
   - `isDrawerOpen`: Modal drawer visibility boolean.
2. Pass `enrolledCount` and `onOpenDrawer` callback to the `<Header />` component via props.
3. Compute `filteredCourses` by filtering on category, difficulty level, and title/faculty keywords.
4. Map over `filteredCourses` to instantiate `<CourseCard />` instances, passing `course`, `isEnrolled`, and `onToggleEnroll` as props.
5. In `<CourseCard />`, clicking the enroll button triggers the parent callback to add/remove the item from `enrolledList`.
6. Render the `<EnrolledDrawer />` component which computes cumulative tuition fees and allows item deletion.

## 6. Test Cases
| Test ID | Test Scenario | Expected Outcome | Status |
|:---|:---|:---|:---|
| TC_01 | Change Category dropdown to "Database" | Only Database course cards are displayed in the grid | Passed |
| TC_02 | Click "Enroll Now" on a course card | Button text flips to "Enrolled", and the cart counter badge in the header increments | Passed |
| TC_03 | Click "My Enrolled Courses" header button | Slide-out drawer opens displaying list of chosen courses and total fees | Passed |
| TC_04 | Click trash icon on an enrolled item in the drawer | Course is removed from the drawer, header badge decrements, card enroll button resets | Passed |

## 7. Conclusion
Successfully built a modular React application using functional components, JSX syntax, props drilling, and state management via the `useState` hook.

## 8. References
- React Official Documentation: https://react.dev/learn
- Managing State with Hooks: https://react.dev/reference/react/useState
