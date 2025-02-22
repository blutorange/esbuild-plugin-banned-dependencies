[![npm version](https://img.shields.io/npm/v/@xenorange/esbuild-plugin-banned-dependencies)](https://www.npmjs.com/package/@xenorange/esbuild-plugin-banned-dependencies) [![build status](https://github.com/blutorange/esbuild-plugin-banned-dependencies/actions/workflows/node.js.yml/badge.svg)](https://github.com/blutorange/esbuild-plugin-banned-dependencies/actions)

[esbuild](https://esbuild.github.io/) plugin for banning specific dependencies
and failing the build when those dependencies are used.

# Usage

See also [test/test.js](test/test.js) and [test/expected](test/expected) for an example.

```js
import { bannedDependenciesPlugin } from "@xenorange/esbuild-plugin-banned-dependencies";

await esbuild.build({
  entryPoints: ["src/index.js"],
  bundle: true,
  // ...your other settings...
  plugins: [
    bannedDependenciesPlugin({
      bannedDependencies: [
				{ pattern: /jquery/ },
				{ pattern: /moment/, reason: "moment is deprecated" },
			],
    }),
  ],
});
```

Options are as follows.

* `pattern` - Regular expression that is matched against an import specified.
When it matches, the imported module is considered to be banned. 
* `reason` - An optional reason for why the dependency is banned. This is
included in the error message.

# Release

Check `CHANGELOG.md` and `package.json` for the version. Then:

```sh
yarn npm publish --access public
git tag -a x.y.z
git push origin x.y.z
```

Then create a github release and set version to next snapshot.
