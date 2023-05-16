import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";

const bundle = config => ({
  ...config,
  input: "src/index.ts",
  external: id => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [typescript()],
    output: [
      {
        file: "dist/crisp.umd.js",
        format: "umd",
        name: "crisp-sdk-web",
        sourcemap: true,
      },
      {
        file: "dist/crisp.esm.js",
        format: "esm",
        sourcemap: true,
      }
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: "dist/crisp.d.ts",
      format: "es",
    },
  }),
]
