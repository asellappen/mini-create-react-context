import ts from "@wessberg/rollup-plugin-ts";
import path from "path";
import { terser } from "rollup-plugin-terser";

function isBareModuleId(id) {
	if (id.startsWith(".")) {
		return false;
	}
	if (id.startsWith("src")) {
		return false;
	}
	return !id.includes(path.join(process.cwd(), "src"));
}

export default function configureRollup() {
	return [
		// CJS:
		{
			input: "src/index.ts",
			output: [
				{ file: `dist/cjs/index.js`, format: "cjs", compact: true, exports: "auto"},
				{ file: `dist/cjs/index.min.js`, format: "cjs", compact: true, exports: "auto", plugins: [terser()],},
			],
			external: isBareModuleId,
			plugins: [
				ts({
					transpiler: "babel",
				}),
			],
		},
		// ESM:
		{
			input: "src/index.ts",
			output: { file: `dist/esm/index.js`, format: "esm" },
			external: isBareModuleId,
			plugins: [
				ts({
					transpiler: "babel",
				}),
			],
		},
	];
}
