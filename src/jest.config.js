module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",

    moduleNameMapper: {
      "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
    },

    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],

    // optional: if using ESM modules inside node_modules, add this to transform them
    transformIgnorePatterns: [
      "node_modules/(?!(react-router-dom|react-router)/)",
    ],
  },
};
