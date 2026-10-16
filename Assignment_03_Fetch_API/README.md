# Assignment 03: Public API Data Fetching using Async/Await & DOM Manipulation

[![Live Demo](https://img.shields.io/badge/Render-Live%20Demo-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://wtl-assignment-03-fetch-api.onrender.com/)

**🌐 Live Deployment URL:** [https://wtl-assignment-03-fetch-api.onrender.com/](https://wtl-assignment-03-fetch-api.onrender.com/)

---

## 1. Title
Write a JavaScript program to fetch data from a public REST API using the Fetch API and `async/await` syntax, and dynamically display the results using DOM manipulation.

## 2. Objectives
- To understand asynchronous programming in modern JavaScript using Promises and `async/await`.
- To master the Fetch API for initiating asynchronous HTTP GET requests.
- To handle asynchronous loading and error conditions gracefully in the user interface.
- To parse JSON payloads and dynamically create/render responsive HTML elements via DOM manipulation.

## 3. Problem Statement
Write a JavaScript program to fetch data from a public API using Fetch and Async/Await. Display the results dynamically on a web page using DOM manipulation with search, filtering, and detailed inspection capabilities.

## 4. Theoretical Concepts
1. **Asynchronous JavaScript**: `async/await` provides syntactic sugar over ES6 Promises, enabling asynchronous non-blocking code to read sequentially.
2. **Fetch API**: Modern browser standard replacing `XMLHttpRequest`. Returns a Promise resolving to the HTTP `Response` object.
3. **Error Handling (`try...catch`)**: Captures HTTP status failures (e.g. 404, 500) and network dropouts to provide UI error boundaries.
4. **DOM Injection**: Dynamic string templating and node mapping (`Array.prototype.map().join('')`) to render cards into the layout grid without full-page reloads.

## 5. Algorithm / Flowchart
1. Trigger `fetchData()` when the page loads.
2. Display a spinning loader (`#loadingState`) and hide any error boundaries.
3. In a `try` block, call:
   ```javascript
   const response = await fetch(apiUrl);
   if (!response.ok) throw new Error(...);
   const data = await response.json();
   ```
4. Populate dynamic category filter options based on unique categories returned in the payload.
5. If search query or sort order is modified, apply JavaScript array operations:
   - Filter items where `title`, `brand`, or `category` matches search input.
   - Sort products by price ascending, descending, or rating.
6. Dynamically generate product card HTML and assign it to the container's `.innerHTML`.
7. Handle errors in `catch (err)`: hide the loader, show `#errorState`, and provide a "Retry Fetch" button.

## 6. Test Cases
| Test ID | Test Scenario | Expected Outcome | Status |
|:---|:---|:---|:---|
| TC_01 | Page loads with active internet connection | Loader appears briefly, then 24 product cards render dynamically | Passed |
| TC_02 | Type "laptop" in the search bar | Grid updates in real-time to show only matching laptop items | Passed |
| TC_03 | Select "Price: Low to High" sort option | Products reorder instantaneously with lowest prices first | Passed |
| TC_04 | Click on any product card or "Details" button | Modal dialog opens showing high-res image, SKU, stock, and description | Passed |
| TC_05 | Disconnect internet / simulate network error | Friendly error banner appears with a "Retry Fetch" button | Passed |

## 7. Conclusion
Successfully implemented an asynchronous web application that communicates with a public REST API using `async/await`, manages loading and error lifecycles, and dynamically updates the DOM.

## 8. References
- MDN Web Docs: Fetch API & Using Fetch
- MDN Web Docs: async function & await operator
- DummyJSON API: https://dummyjson.com/
