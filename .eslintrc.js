module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "prettier",
    "plugin:prettier/recommended",
    "eslint:recommended",
  ],

  plugins: ["prettier"],

  rules: {
    "vue/multi-word-component-names": 0,
    "vue/no-unused-components": 0,
    "no-console": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-mixed-spaces-and-tabs": 0, // disable rule
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
};
