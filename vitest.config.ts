import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	test: {
		workspace: [
			{
				plugins: [react(), tsconfigPaths()],
				test: {
					globals: true,
					environment: "jsdom",
					include: ["src/**/*.test.{ts,tsx}"],
					setupFiles: ["vitest.setup.ts"],
				},
			},
			{
				extends: true,
				plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						name: "chromium",
						provider: "playwright",
					},
					setupFiles: [".storybook/vitest.setup.ts"],
				},
			},
		],
	},
});
