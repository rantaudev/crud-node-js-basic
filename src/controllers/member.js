const Member = require("../models/member.js");
const { format } = require("date-fns");

// Create and Save a new Member
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Member
  const member = new Member({
    nama: req.body.nama,
    umur: req.body.umur,
    created_at: format(new Date(), "yyyy-MM-dd kk:mm:ss"),
    updated_at: format(new Date(), "yyyy-MM-dd kk:mm:ss"),
  });

  // Save Member in the database
  Member.create(member, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Customer.",
      });
    else res.redirect("/members");
  });
};

// find Member by id in the database
exports.findOne = (req, res) => {
  Member.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found member with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id,
        });
      }
    } else res.render("members/edit", { member: data });
  });
};

// find All Members in the database
exports.findAll = (req, res) => {
  Member.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers.",
      });
    else res.render("members/index", { members: data });
  });
};

// Update a Member identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Member.updateById(
    req.params.id,

    new Member({
      nama: req.body.nama,
      umur: req.body.umur,
      updated_at: format(new Date(), "yyyy-MM-dd kk:mm:ss"),
    }),

    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found member with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating member with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a member with the specified id in the request
exports.delete = (req, res) => {
  Member.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found member with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete member with id " + req.params.id,
        });
      }
    } else res.send({ message: `member was deleted successfully!` });
  });
};

// Delete all members from the database.
exports.deleteAll = (req, res) => {
  Member.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all members.",
      });
    else res.send({ message: `All members were deleted successfully!` });
  });
};
