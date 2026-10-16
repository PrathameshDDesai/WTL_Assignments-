# Assignment 07: User Registration Form with React Controlled Components & Validation

[![Live Demo](https://img.shields.io/badge/Render-Live%20Demo-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://wtl-assignment-07-react-form.onrender.com/)

**🌐 Live Deployment URL:** [https://wtl-assignment-07-react-form.onrender.com/](https://wtl-assignment-07-react-form.onrender.com/)

---

## 1. Title
Build a user registration form in React using controlled components, implementing validation for required fields, phone numbers, password complexity, and email formatting with regular expressions.

## 2. Objectives
- To understand the difference between uncontrolled and controlled React components.
- To manage form input state strictly via React `useState`.
- To implement input validation on blur, change, and final submission.
- To use regular expressions (`RegExp`) to validate email formatting and password strength requirements.

## 3. Problem Statement
Build a user registration form in React using controlled components. Implement basic validation for required fields and email format, providing informative visual feedback and displaying a validated summary upon successful submission.

## 4. Theoretical Concepts
1. **Controlled Components**: Form inputs whose value is bound to a React state variable (`value={state}`) and updated through an `onChange` event handler, ensuring React remains the single source of truth.
2. **Email Regular Expression**:
   ```javascript
   /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   ```
   Ensures local-part, `@` delimiter, domain, and TLD are properly arranged without whitespace.
3. **Password Complexity & Strength**: Evaluating minimum 8 characters, at least 1 uppercase letter, 1 digit, and 1 special character to calculate a dynamic strength percentage.
4. **Touched State Pattern**: Prevents premature error display until the user has actively focused or interacted with a field.

## 5. Algorithm / Flowchart
1. Initialize form state with keys: `fullName`, `prn`, `email`, `phone`, `department`, `semester`, `password`, `confirmPassword`, `agreeTerms`.
2. Maintain `errors` and `touched` objects to manage error tracking.
3. On input change:
   - Update `formData[name]` with the latest input character.
   - If field has been previously touched, rerun `validateField(name, value)` immediately.
4. On input blur:
   - Mark field in `touched` as true and validate to show inline error message.
5. On form submit:
   - Mark all fields as touched.
   - Execute full validation suite.
   - If any errors exist, block submission and focus erroneous field.
   - If valid, render the `<RegistrationSuccess />` component displaying student registration metadata.

## 6. Test Cases
| Test ID | Test Scenario | Expected Outcome | Status |
|:---|:---|:---|:---|
| TC_01 | Submit an empty form | All required fields display red error indicators and messages | Passed |
| TC_02 | Enter invalid email "student@sanjivani" (missing TLD) | Error message: "Please enter a valid email format" | Passed |
| TC_03 | Enter mismatching Confirm Password | Error message: "Passwords do not match" | Passed |
| TC_04 | Fill valid inputs and submit | Registration form switches to Success Summary with formatted profile details | Passed |

## 7. Conclusion
Successfully implemented a robust student registration form in React utilizing controlled components, two-way state binding, regex validation, and interactive feedback indicators.

## 8. References
- React Forms Documentation: https://react.dev/reference/react-dom/components/input
- MDN Regular Expressions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
