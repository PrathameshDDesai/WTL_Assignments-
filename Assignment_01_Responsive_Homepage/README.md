# Assignment 01: Responsive Homepage Design

## 1. Title
Design and develop a responsive homepage for a healthcare/hospital website using HTML5, CSS3, and Bootstrap 5.

## 2. Objectives
- To learn the structural semantics of HTML5.
- To understand the mobile-first responsive grid system provided by Bootstrap 5.
- To use custom CSS styles to supplement framework utility classes.
- To integrate modal dialogues, responsive navbars, and interactive form handling.

## 3. Problem Statement
Write a program to design a responsive homepage (e.g., for an E-commerce or Hospital website) using HTML, CSS, and Bootstrap. The layout must adapt seamlessly across desktop, tablet, and mobile screens.

## 4. Theoretical Concepts
1. **Bootstrap Grid System**: Built on Flexbox, offering 12 columns per container with breakpoints: `xs` (<576px), `sm` (≥576px), `md` (≥768px), `lg` (≥992px), `xl` (≥1200px), `xxl` (≥1400px).
2. **Viewport Meta Tag**: Ensures mobile devices render pages at 1:1 scale without arbitrary zooming.
3. **Semantic HTML5 Elements**: `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>` for accessibility and SEO.
4. **CSS Custom Properties & Flexbox/Grid**: Used for bespoke styling, typography, and hover micro-animations.

## 5. Algorithm / Flowchart
1. Initialize the HTML document with HTML5 doctype and link Bootstrap 5 CSS, Bootstrap Icons, Google Fonts, and custom CSS.
2. Build the top emergency contact strip with flexbox layout.
3. Design a responsive sticky `<nav>` utilizing Bootstrap collapse toggler for smaller viewports.
4. Create the Hero section with two columns (Headline + Call-to-actions, and OPD Quick Booking card).
5. Build the Specialities grid using `.row` and responsive column classes (`col-md-6 col-lg-4`).
6. Build Doctors team cards and Patient Testimonial review cards.
7. Implement an interactive Appointment Booking Modal using Bootstrap modal components.
8. Attach custom JavaScript to handle form validation and feedback notifications.

## 6. Test Cases
| Test ID | Test Scenario | Expected Outcome | Status |
|:---|:---|:---|:---|
| TC_01 | Resize browser to mobile width (<576px) | Navigation collapses into hamburger menu; cards stack in a single column | Passed |
| TC_02 | Click "Book Appointment" button | Modal overlay opens smoothly without reloading the page | Passed |
| TC_03 | Submit appointment form without required fields | Validation triggers, alert message displayed | Passed |
| TC_04 | Fill valid details and submit appointment | Success alert shown and modal auto-closes after 3 seconds | Passed |

## 7. Conclusion
Successfully built a modern, responsive, and mobile-friendly hospital portal homepage demonstrating HTML5 semantics, Bootstrap 5 grid utilities, responsive components, and custom CSS styling.

## 8. References
- Bootstrap 5 Documentation: https://getbootstrap.com/docs/5.3/
- MDN Web Docs: Responsive Web Design Basics
