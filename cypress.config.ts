import { loadEnvConfig } from "@next/env";
import { defineConfig } from "cypress";

const { combinedEnv } = loadEnvConfig(process.cwd());

const resolvedBaseUrl =
  process.env.CYPRESS_BASE_URL ||
  process.env.BASE_URL ||
  (combinedEnv && (combinedEnv as any).CYPRESS_BASE_URL) ||
  (combinedEnv && (combinedEnv as any).BASE_URL) ||
  "http://localhost:3000";

export default defineConfig({
  env: combinedEnv,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: resolvedBaseUrl,
    retries: {
      runMode: 3,
    },
    video: false,
    screenshotOnRunFailure: true,
    supportFile: false,
  },
});
