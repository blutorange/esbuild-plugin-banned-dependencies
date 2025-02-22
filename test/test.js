/** @import { BuildFailure } from "esbuild" */

import { build } from "esbuild";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { bannedDependenciesPlugin } from "../index.js";

console.log("Running IT tests with esbuild...");

const dirname = path.dirname(fileURLToPath(import.meta.url));

await fs.rm(path.join(dirname, "dist"), { force: true, recursive: true });

// Run esbuild with plugin

const results = await Promise.allSettled([build({
	entryPoints: ["src/script.js"],
	outdir: "./dist/",
	absWorkingDir: dirname,
	bundle: true,
	legalComments: "none",
	plugins: [
		bannedDependenciesPlugin({
			bannedDependencies: [
				{ pattern: /jquery/ },
				{ pattern: /moment/, reason: "moment is deprecated" },
			],
		}),
	],
})]);

const result = results[0];
if (results.length !== 1 || result === undefined) {
	throw new Error(`Expected exactly one result, but got ${results.length}`);
}

if (result.status !== "rejected") {
	throw new Error("Expected build to fail, but it succeeded");
}

/** @type { BuildFailure } */
const reason = result.reason;


if (reason.errors.length !== 4) {
	throw new Error(`Expected 4 build errors, but got ${reason.errors.length}`);
}
if (reason.warnings.length !== 0) {
	throw new Error(`Expected 0 build warnings, but got ${reason.warnings.length}`);
}

for (const error of reason.errors) {
	if (error.pluginName !== "banned-dependencies-plugin") {
		throw new Error(`Expected pluginName of error to be banned-dependencies-plugin, but was ${error.pluginName}`);
	}
}

if (reason.errors[0].text !== "Dependency '../moment' is banned: moment is deprecated") {
	throw new Error(`Expected error message <Dependency '../moment' is banned: moment is deprecated>, but was <${reason.errors[0].text}>`);
}
if (reason.errors[1].text !== "Dependency 'jquery' is banned") {
	throw new Error(`Expected error message <Dependency 'jquery' is banned>, but was <${reason.errors[1].text}>`);
}
if (reason.errors[2].text !== "Dependency 'moment' is banned: moment is deprecated") {
	throw new Error(`Expected error message <Dependency 'moment' is banned: moment is deprecated>, but was <${reason.errors[2].text}>`);
}
if (reason.errors[3].text !== "Dependency 'moment/locale/de.js' is banned: moment is deprecated") {
	throw new Error(`Expected error message <Dependency 'moment/locale/de.js' is banned: moment is deprecated>, but was <${reason.errors[3].text}>`);
}

console.log("IT tests successful");
