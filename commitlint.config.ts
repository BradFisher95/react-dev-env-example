module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: ["commitlint-plugin-function-rules"],
  rules: {
    "subject-empty": [2, "never"], // level 2 - enforce rule
    "subject-case": [0], // level 0 - disable
    "type-enum": [0], // level 0 - disable rule for custom function-rule
    "scope-enum": [0], // level 0 - disable rule for custom function-rule
    "function-rules/scope-enum": [
      2,
      "always",
      (parsed) => {
        const regex = /([A-Z]{2})-(\d{2,})/;

        if (parsed.type === "poc") return [true];

        const match = regex.exec(parsed.scope);
        if (!match) {
          return [
            false,
            `Scope must match: ${regex}, Please see README.md for more information`,
          ];
        } else {
          return [true];
        }
      },
    ],
    "function-rules/type-enum": [
      2,
      "always",
      (parsed) => {
        const types = ["task", "bugfix", "feature", "dev", "poc"];
        if (
          !parsed.type ||
          types.some((types) => parsed.type.includes(types))
        ) {
          return [true];
        } else {
          return [
            false,
            `Commit message must start with one of the following types: [${types.join(
              ", "
            )}]. Please see README.md for more information.`,
          ];
        }
      },
    ],
  },
};
