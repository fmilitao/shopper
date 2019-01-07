module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: [ 'lcov' ],
  roots: [
    "<rootDir>/test"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(test/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ]
};
