import { loadEnvConfig } from "@next/env";
import { defineConfig } from "cypress";

const { combinedEnv } = loadEnvConfig(process.cwd());

const isCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";
const envBaseUrl = combinedEnv?.CYPRESS_BASE_URL || combinedEnv?.BASE_URL;

const resolvedBaseUrl =
  process.env.CYPRESS_BASE_URL ||
  process.env.BASE_URL ||
  envBaseUrl ||
  (!isCI ? "http://localhost:3000" : undefined);

export default defineConfig({
  e2e: {
    baseUrl: resolvedBaseUrl,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    video: false,
    screenshotOnRunFailure: true,
    supportFile: false,
  },
});
