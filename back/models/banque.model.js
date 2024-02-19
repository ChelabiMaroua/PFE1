import pool from "./db.js";

class Banque {
  constructor(banque) {
    this.nom = banque.nom;
    this.adresse = banque.adresse;
    this.tel = banque.tel;
  }

  static create(newBanque, result) {
    pool.query("INSERT INTO banque SET ?", newBanque, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created banque: ", { id: res.insertId, ...newBanque });
      result(null, { id: res.insertId, ...newBanque });
    });
  }

  static findById(id, result) {
    pool.query(`SELECT * FROM banque WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found banque: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Banque with the id
      result({ kind: "not_found" }, null);
    });
  }

  static getAll(nom, result) {
    let query = "SELECT * FROM banque";

    if (nom) {
      query += ` WHERE nom LIKE '%${nom}%'`;
    }

    pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("banques: ", res);
      result(null, res);
    });
  }

  static updateById(id, banque, result) {
    pool.query(
      "UPDATE banque SET nom = ?, adresse = ?, tel = ? WHERE id_banque = ?",
      [banque.nom, banque.adresse, banque.tel, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Banque with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated banque: ", { id: id, ...banque });
        result(null, { id: id, ...banque });
      }
    );
  }

  static remove(id, result) {
    pool.query("DELETE FROM banque WHERE id_banque = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Banque with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted banque with id: ", id);
      result(null, res);
    });
  }

  static removeAll(result) {
    pool.query("DELETE FROM banque", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} banques`);
      result(null, res);
    });
  }
}

export default Banque;