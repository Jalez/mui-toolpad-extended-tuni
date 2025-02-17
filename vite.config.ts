/** @format */

import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    // react({
    //   babel: {
    //     plugins: [['babel-plugin-react-compiler']],
    //   },
    // }),
    dts({
      insertTypesEntry: true,
      include: ["src"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MuiToolpadExtendedTuni",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "es.js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@mui/material",
        "@mui/icons-material",
        "@emotion/react",
        "@emotion/styled",
      ],
      output: {
        exports: "named",
      },
    },
  },
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./src/setupTests.ts",
  // },
});
