import { loadEnvConfig } from "@next/env";
import { defineConfig } from "cypress";

const { combinedEnv } = loadEnvConfig(process.cwd());

export default defineConfig({
  env: combinedEnv,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 3,
    },
    video: false,
    screenshotOnRunFailure: true,
    supportFile: false,
  },
});
