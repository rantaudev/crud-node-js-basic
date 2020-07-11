// create new router
const router = require("express").Router();
const members = require("../controllers/member.js");

// Create a new member
router.post("/", members.create);
// Retrieve a single member with id
router.get("/:id", members.findOne);
// Retrieve all members
router.get("/", members.findAll);
// Update a member with id
router.put("/:id", members.update);
// Delete a member with id
router.delete("/:id", members.delete);
// Delete all member
router.delete("/", members.deleteAll);

module.exports = router;
