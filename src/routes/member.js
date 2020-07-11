module.exports = app => {
    const members = require("../controllers/member.js");
  
    // Create a new member
    app.post("/members", members.create);
     // Retrieve a single memmber with id
    app.get("/members/:id", members.findOne);

  };