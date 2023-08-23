module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        // commit types
        "ui", // UI related changes that does not affect functionality but the visual of a website
        "ci", // changes related to Continuous Integration configuration or scripts
        "fix", // bug fixes or corrections
        "feat", // new features or significant enhancements
        "docs", // documentation-related changes
        "perf", // performance-related improvements or optimizations
        "style", // code style or formatting changes
        "test", // changes to test cases or testing-related infrastructure
        "build", // changes related to the build system or process
        "chore", // miscellaneous or general changes
        "revert", // reverting a previous commit or changes
        "refactor", // code refactoring or restructuring
        "security", // security-related changes or fixes
        "changeset", // changesets or changelogs
        "translation", // changes related to translations or localization
      ],
    ],
  },
}
