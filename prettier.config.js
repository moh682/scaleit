/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 130,
  arrowParens: "always",
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
