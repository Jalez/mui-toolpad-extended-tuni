/** @format */

import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MuiToolpadExtendedTuniCore",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "es.js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "@mui/material",
        "@mui/icons-material",
        "@mui/x-date-pickers",
        "@toolpad/core",
        "@emotion/react",
        "@emotion/styled",
        "zustand",
        "notistack",
      ],
      output: {
        exports: "named",
      },
      onwarn(warning, warn) {
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

