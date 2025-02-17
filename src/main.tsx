/** @format */
// import { scan } from "react-scan"; // must be imported before React and React DOM. T
import { createRoot } from "react-dom/client";
import App from "./App";

// scan({
//   enabled: process.env.NODE_ENV === "development",
//   trackUnnecessaryRenders: true,
// });

(async () => {
  if (import.meta.env.MODE === "development") {
    try {
      const { worker } = await import("./LMSToolpad/mocks/browser");
      await worker.start({
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
        quiet: true,
      });
      console.log("Mock service worker started");
    } catch (error) {
      console.warn("MSW initialization failed:", error);
    }
  }

  console.log("Starting app...");
  // Render the app after MSW has started
  createRoot(document.getElementById("root")!).render(<App />);
})();
