// jest configuration to use directly on typescript files
// since compiling from scratch can be slow, you can use the `after-build` variant
// together with `tsc -w` to run tests over incrementally compiled code
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
