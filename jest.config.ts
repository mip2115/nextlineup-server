const { defaults } = require("jest-config");
module.exports = {
  testTimeout: 20000,
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  // ...
};
