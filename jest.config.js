// Setup ENV variables for testing
require("dotenv").config();

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    // Include Jest typings during testing
    "ts-jest": {
      tsconfig: "<rootDir>/src/__tests__/tsconfig.json",
    },
  },
};
