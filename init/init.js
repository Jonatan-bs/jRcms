const userRole = require("./userRole");
const masterUser = require("./masterUser");

const init = () => {
  masterUser();
  userRole();
};

module.exports = init;
