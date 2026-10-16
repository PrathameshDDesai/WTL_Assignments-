# Assignment 06: React API Data Fetching with Axios, Loading & Error States

[![Live Demo](https://img.shields.io/badge/Render-Live%20Demo-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://wtl-assignment-06-react-axios1.onrender.com/)

**🌐 Live Deployment URL:** [https://wtl-assignment-06-react-axios1.onrender.com/](https://wtl-assignment-06-react-axios1.onrender.com/)

---

## 1. Title
Write a React application utilizing the Axios HTTP client library to fetch data from a public REST API, display the response across functional components, and manage front-end loading and error boundaries.

## 2. Objectives
- To learn the benefits of Axios (automatic JSON parsing, HTTP interceptors, unified error objects) over standard Fetch.
- To orchestrate side effects in functional components using the `useEffect` Hook.
- To manage three distinct UI phases: Initial Loading, Rendered Success State, and Handled Error State.
- To implement animated skeleton placeholders to enhance perceived performance.

## 3. Problem Statement
Write a React program that uses Axios to fetch data from a public or back-end API, displays the response in a component, and manages loading and error states on the front end.

## 4. Theoretical Concepts
1. **Axios vs. Fetch**: Axios automatically serializes and deserializes JSON payloads, rejects promises on HTTP error codes (e.g. 4xx and 5xx), and offers built-in timeout handling.
2. **Component Lifecycle with `useEffect`**: Initiates asynchronous requests on mount via an empty dependency array `[]`.
3. **Tri-State Pattern**: Maintaining `loading`, `error`, and `data` in component state ensures consistent user experiences regardless of network outcomes.
4. **Shimmer Skeletons**: CSS keyframe animations that mimic layout geometry while awaiting remote data.

## 5. Algorithm / Flowchart
1. Mount the `App` component; initialize state:
   - `users = []`, `loading = true`, `error = null`.
2. Inside `useEffect()`, call `fetchUsers(url)`.
3. Use `await axios.get(url, { timeout: 8000 })`.
4. On success:
   - Set `users` to `response.data`.
   - Set `loading = false` and `error = null`.
5. In `catch (err)`:
   - Differentiate between server responses (`err.response`), connection failures (`err.request`), or syntax exceptions (`err.message`).
   - Store readable error text in `error` state and set `loading = false`.
6. Conditional Rendering:
   - If `loading`: Render `<SkeletonLoader />`.
   - If `error`: Render `<ErrorCard />` with a "Retry" button.
   - If data exists: Render search toolbar, count badge, and mapped `<UserCard />` elements.

## 6. Test Cases
| Test ID | Test Scenario | Expected Outcome | Status |
|:---|:---|:---|:---|
| TC_01 | App mounts with valid network connectivity | Shimmer skeleton cards show for ~300ms, followed by 10 user cards | Passed |
| TC_02 | Click "Simulate 404 Error" button | Axios catches 404 status and renders styled error card with retry button | Passed |
| TC_03 | Click "Reset & Fetch Valid Data" on error card | Loading skeleton displays and valid data restores successfully | Passed |
| TC_04 | Click on any user card | Profile modal opens displaying address, company, and contact metadata | Passed |

## 7. Conclusion
Successfully implemented a robust React application integrating the Axios library for REST API calls with complete front-end lifecycle handling for loading spinners and error boundaries.

## 8. References
- Axios Documentation: https://axios-http.com/docs/intro
- React Documentation on Synchronizing with Effects: https://react.dev/reference/react/useEffect
