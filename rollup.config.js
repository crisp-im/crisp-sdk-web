import typescript from "@rollup/plugin-typescript";

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  external: (id) => !/^[./]/.test(id)
});

export default [
  bundle({
    plugins: [
      typescript({
        declaration: true,
        declarationDir: "dist"
      })
    ],
    output: [
      {
        file: "dist/crisp.umd.cjs",
        format: "umd",
        name: "crisp-sdk-web",
        sourcemap: true
      },
      {
        file: "dist/crisp.esm.js",
        format: "esm",
        sourcemap: true
      }
    ]
  })
];
