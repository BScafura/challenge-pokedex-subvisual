module.exports = {
  plugins: [
    "testing-library",
    // other plugins...
  ],
  extends: [
    "plugin:testing-library/react", // Add rules for Testing Library
    // other extensions...
  ],
  rules: {
    "testing-library/no-node-access": "error", // Enable the rule to disallow direct Node access
    // other rules...
  },
};
