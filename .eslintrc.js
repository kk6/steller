module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false
    },
    babelOptions: {
      configFile: "path/to/config.js"
    }
  },
  rules: {
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true
      }
    ]
  }
};
