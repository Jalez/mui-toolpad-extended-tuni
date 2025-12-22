/** @format */

import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src"],
      outDir: "dist",
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/*.spec.ts", "src/**/*.spec.tsx", "src/App.tsx", "src/test/**"],
    }),
  ],
  resolve: {
    alias: {
      "@mui-toolpad-extended-tuni/core": resolve(__dirname, "../core/src"),
    },
  },
  optimizeDeps: {
    include: [
      "@mui/material",
      "@mui/icons-material",
      "@mui/x-date-pickers",
      "@toolpad/core",
    ],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MuiToolpadExtendedTuniMain",
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
        "@mui-toolpad-extended-tuni/core",
        "@toolpad/core",
        "react-router-dom",
        "zustand",
        "axios",
        "lodash",
        "uuid",
        "react-grid-layout",
        "react-chartjs-2",
        "chart.js",
        "d3-force",
        "react-colorful",
        "styled-components",
        "@dnd-kit/core",
        "@dnd-kit/modifiers",
        "@dnd-kit/sortable",
      ],
      output: {
        exports: "named",
      },
      onwarn(warning, warn) {
        // Suppress "use client" directive warnings from node_modules
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('"use client"')) {
          return;
        }
        warn(warning);
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
