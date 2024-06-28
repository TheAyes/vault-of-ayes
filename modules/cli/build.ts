import Bun from "bun";

const result = Bun.build({
	entrypoints: ["./src/program.ts"],
	outdir: "./bin",
	target: "node",
	format: "esm",
	sourcemap: "external"
});
