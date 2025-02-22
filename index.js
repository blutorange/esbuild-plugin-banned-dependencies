/** @import { Plugin } from "esbuild" */

/**
 * @typedef {Object} BannedDependency A dependency that should be banned from
 * the bundle.
 * @property {RegExp} pattern Regular expression that is matched against an
 * import specified. When it matches, the imported module is considered to be
 * banned.
 * @property {string} [reason] An optional reason for why the dependency is
 * banned. This is included in the error message.
 */
undefined;

/**
 * @typedef {Object} BannedDependenciesPluginOptions Options for the banned
 * dependencies esbuild plugin, with the dependencies to ban.
 * @property {readonly BannedDependency[]} bannedDependencies List of
 * dependencies to ban.
 */
undefined;

const PluginName = "banned-dependencies-plugin";

/**
* Finds the first banned dependency rule that matches the given path,
* and returns the reason for banning it.
* @param {readonly BannedDependency[]} bannedDependencies All banned dependencies.
* @param {string} path The path to match against the banned dependencies.
* @returns {string | undefined} The reason for banning the dependency, if any.
*/
function findReason(bannedDependencies, path) {
	return bannedDependencies.find(({ pattern }) => pattern.test(path))?.reason;
}

/**
 * Creates a comparator that compares values by a key.
 * @template Value Type of the values to compare.
 * @template Key Type of the keys by which to compare values.
 * @param {(value: Value) => Key} keyExtractor Extractor for the keys.
 * @param {(k1: Key, k2: Key) => number} keyComparator Comparator for the keys.
 * @returns {(v1: Value, v2: Value) => number} The comparator that compares by
 * keys.
 */
function comparingBy(keyExtractor, keyComparator) {
	return (v1, v2) => keyComparator(keyExtractor(v1), keyExtractor(v2));
}

/**
 * Compares two string case-insensitively.
 * @param {string} s1 First string to compare. 
 * @param {string} s2 Second string to compare.
 * @returns {number} The result of the comparison.
 */
function compareIgnoreCase(s1, s2) {
	const i1 = s1.toLowerCase();
	const i2 = s2.toLowerCase();
	return i1 < i2 ? -1 : i1 > i2 ? 1 : 0;
}

/**
 * Plugin for esbuild raises an error when a banned dependency is imported.
 * @param {BannedDependenciesPluginOptions} options Options for the banned
 * dependencies plugin with the list of banned dependencies.
 * @returns {Plugin} A new esbuild plugin for banning certain dependencies.
 */
export function bannedDependenciesPlugin(options) {
	const filter = new RegExp(`(${options.bannedDependencies.map(x => x.pattern.source).join(')|(')})`);
	return {
		name: PluginName,
		setup: build => {
			const errors = new Map();
			build.onResolve(
				{ filter },
				args => {
					const reason = findReason(options.bannedDependencies, args.path);
					const message = reason !== undefined
						? `Dependency '${args.path}' is banned: ${reason}`
						: `Dependency '${args.path}' is banned`;
					errors.set(args.path, message);
					return undefined;
				},
			);
			build.onEnd(() => {
				return {
					errors: [...errors.entries()]
						.sort(comparingBy(([key]) => key, compareIgnoreCase))
						.map(([_, message]) => message)
						.map((message => ({ text: message }))),
				};
			});
		},
	};
};

