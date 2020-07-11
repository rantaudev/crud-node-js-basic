module.exports = app => {
    const members = require("../controllers/member.js");
  
    // Create a new Customer
    app.post("/members", members.create);

  };