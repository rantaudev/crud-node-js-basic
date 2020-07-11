module.exports = app => {
    const members = require("../controllers/member.js");
  
    // Create a new member
    app.post("/members", members.create);
     // Retrieve a single member with id
    app.get("/members/:id", members.findOne);
    // Retrieve all members
    app.get("/members", members.findAll);

  };