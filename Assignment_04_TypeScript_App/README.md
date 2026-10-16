# Assignment 04: Client-Side Interactive Web Application using TypeScript

[![Live Demo](https://img.shields.io/badge/Render-Live%20Demo-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://wtl-assignment-04-typescript.onrender.com/)

**🌐 Live Deployment URL:** [https://wtl-assignment-04-typescript.onrender.com/](https://wtl-assignment-04-typescript.onrender.com/)

---

## 1. Title
Develop a web-based client-side application using TypeScript featuring custom data structures, strict interfaces, DOM interactivity, and dynamic academic GPA calculation.

## 2. Objectives
- To understand the advantages of static typing with TypeScript over vanilla JavaScript.
- To use custom interfaces (`interface`), union types (`type`), and strict type assertions.
- To configure `tsconfig.json` for compilation to modern ECMAScript standards.
- To implement business logic for weighted averages (SGPA) and dynamically update the DOM with typed models.

## 3. Problem Statement
Develop a web-based application using TypeScript that involves user interaction and data display on the client side. The application calculates semester SGPA dynamically based on user-entered courses, credits, and awarded grade letters.

## 4. Theoretical Concepts
1. **Type Safety & Interfaces**: Defining strict contracts (`Course`, `GradeLetter`, `AcademicSummary`) that prevent runtime attribute mismatches.
2. **DOM Type Assertions**: Casting generic DOM elements to specialized TypeScript interfaces (`HTMLInputElement`, `HTMLSelectElement`, `HTMLTableSectionElement`).
3. **Compilation Pipeline**: Compiling TypeScript `.ts` files into browser-executable `.js` scripts using `tsc` according to options defined in `tsconfig.json`.
4. **Calculations**:
   $$\text{SGPA} = \frac{\sum (\text{Course Credits} \times \text{Grade Point})}{\sum \text{Total Credits}}$$

## 5. Algorithm / Flowchart
1. Define interfaces `Course`, `AcademicSummary`, and grade union type `GradeLetter`.
2. Construct the `AcademicTracker` class and securely cast DOM elements.
3. Handle form submission:
   - Extract code, title, credits, course type, and grade.
   - Validate numerical values and non-empty strings.
   - Create a typed `Course` object and append to `courses[]`.
4. Compute totals:
   - Sum total registered credits.
   - Sum earned credits (excluding 'F' grades).
   - Multiply credits by grade points and divide by total credits to obtain SGPA.
   - Determine performance classification (Distinction, First Class, etc.).
5. Dynamically generate table rows and update summary cards.

## 6. Test Cases
| Test ID | Test Scenario | Expected Outcome | Status |
|:---|:---|:---|:---|
| TC_01 | Add course with 4 credits and Grade 'O' (10 GP) | Table row added, 40 grade points calculated, SGPA reflects 10.00 | Passed |
| TC_02 | Add course with 3 credits and Grade 'F' (0 GP) | Total credits increases by 3, earned credits remains unchanged, status marked as "Fail" | Passed |
| TC_03 | Delete an existing course from the table | Course is removed from the array, credits and SGPA update automatically | Passed |
| TC_04 | Click "Clear All" | Prompts confirmation, resets table to empty state and resets SGPA to 0.00 | Passed |

## 7. Conclusion
Successfully developed an interactive client-side web application using TypeScript, demonstrating static typing, interfaces, compilation configuration, and robust DOM data rendering.

## 8. References
- TypeScript Official Documentation: https://www.typescriptlang.org/docs/
- Handbook on TypeScript DOM Manipulation
