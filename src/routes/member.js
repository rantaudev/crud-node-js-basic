module.exports = app => {
    const members = require("../controllers/member.js");
  
    // Create a new member
    app.post("/members", members.create);
     // Retrieve a single member with id
    app.get("/members/:id", members.findOne);
    // Retrieve all members
    app.get("/members", members.findAll);
    // Update a member with id
    app.put("/members/:id", members.update);
    // Delete a member with id
    app.delete("/members/:id", members.delete);
    // Create a new member
    app.delete("/members", members.deleteAll);

  };