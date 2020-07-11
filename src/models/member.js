const sql = require("./db.js");

// constructor
const Member = function(member) {
  this.umur = member.umur;
  this.nama = member.nama;
  this.created_at = member.created_at;
  this.updated_at = member.updated_at;
};

Member.create = (member, result) => {
  sql.query("INSERT INTO member SET ?", member, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created member: ", { id: res.insertId, ...member });
    result(null, { id: res.insertId, ...member });
  });
};

module.exports = Member;