const { CONF: tsConfig = "tsconfig.json" } = process.env;

module.exports = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*.spec.ts",
    "!<rootDir>/src/**/__*__/*"
  ],
  testEnvironment: "node",
  coveragePathIgnorePatterns: [".*.d.ts", "/node_modules/"],
  globals: {
    "ts-jest": {
      ...tsConfig
    }
  },
  moduleFileExtensions: ["html", "js", "ts", "tsx"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(htm|tsx?)$": "ts-jest"
  },
  verbose: true
};
