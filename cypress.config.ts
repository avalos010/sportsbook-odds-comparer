import { loadEnvConfig } from "@next/env";
import { defineConfig } from "cypress";

const { combinedEnv } = loadEnvConfig(process.cwd());

const isCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";

const resolvedBaseUrl =
  process.env.CYPRESS_BASE_URL ||
  process.env.BASE_URL ||
  (combinedEnv && (combinedEnv as any).CYPRESS_BASE_URL) ||
  (combinedEnv && (combinedEnv as any).BASE_URL) ||
  (!isCI ? "http://localhost:3000" : undefined);

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
