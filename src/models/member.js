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

Member.getAll = result => {
    sql.query(`SELECT * FROM ${tableName}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("members: ", res);
      result(null, res);
    });
};

Member.updateById = (id, member, result) => {
    sql.query(
      `UPDATE ${tableName} SET nama = ?, umur = ?, updated_at = ? WHERE id = ?`,
      [member.nama, member.umur, member.updated_at, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found member with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated member: ", { id: id, ...member });
        result(null, { id: id, ...member });
      }
    );
};

Member.remove = (id, result) => {
    sql.query(`DELETE FROM ${tableName} WHERE id = ?`, id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found member with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted member with id: ", id);
      result(null, res);
    });
};
  
Member.removeAll = result => {
    sql.query(`DELETE FROM ${tableName}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} members`);
      result(null, res);
    });
};
  

module.exports = Member;