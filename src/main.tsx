/** @format */
// import { scan } from "react-scan"; // must be imported before React and React DOM. T
import { createRoot } from "react-dom/client";
import App from "./App";

// Import React Grid Layout styles
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// scan({
//   enabled: process.env.NODE_ENV === "development",
//   trackUnnecessaryRenders: true,
// });

// Mock initialization removed - mocks are now handled by extension packages
// For development, import mocks from @mui-toolpad-extended-tuni/courses and @mui-toolpad-extended-tuni/users

console.log("Starting app...");
createRoot(document.getElementById("root")!).render(<App />);
