const sql = require("./db.js");
const tableName =  "member";

// constructor
const Member = function(member) {
  this.umur = member.umur;
  this.nama = member.nama;
  this.created_at = member.created_at;
  this.updated_at = member.updated_at;
};

Member.create = (member, result) => {
  sql.query(`INSERT INTO ${tableName} SET ?`, member, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created member: ", { id: res.insertId, ...member });
    result(null, { id: res.insertId, ...member });
  });
};

Member.findById = (id, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE id = ?`, id, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        if (res.length) {
        console.log("found member: ", res[0]);
        result(null, res[0]);
        return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Member;