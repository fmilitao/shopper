// directly over the compile code (does not compile typescript sources)
module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: [ 'lcov' ],
  roots: [
    "<rootDir>/build/test"
  ],
  testRegex: "(test/.*|(\\.|/)(test|spec))\\.js$",
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
