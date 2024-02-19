import pool from "./db.js";

class Entreprise {
  constructor(entreprise) {
    this.nom = entreprise.nom;
    this.adresse = entreprise.adresse;
    this.tel = entreprise.tel;
    this.contact = entreprise.contact;
  }

  static create(newEntreprise, result) {
    pool.query("INSERT INTO entreprise SET ?", newEntreprise, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created entreprise: ", { id: res.insertId, ...newEntreprise });
      result(null, { id: res.insertId, ...newEntreprise });
    });
  }

  static findById(id, result) {
    pool.query(`SELECT * FROM entreprise WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found entreprise: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Entreprise with the id
      result({ kind: "not_found" }, null);
    });
  }

  static getAll(nom, result) {
    let query = "SELECT * FROM entreprise";

    if (nom) {
      query += ` WHERE nom LIKE '%${nom}%'`;
    }

    pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("entreprises: ", res);
      result(null, res);
    });
  }

  static updateById(id, entreprise, result) {
    pool.query(
      "UPDATE entreprise SET nom = ?, adresse = ?, tel = ?, contact = ? WHERE id_entreprise = ?",
      [entreprise.nom, entreprise.adresse, entreprise.tel, entreprise.contact, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Entreprise with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated entreprise: ", { id: id, ...entreprise });
        result(null, { id: id, ...entreprise });
      }
    );
  }

  static remove(id, result) {
    pool.query("DELETE FROM entreprise WHERE id_entreprise = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Entreprise with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted entreprise with id: ", id);
      result(null, res);
    });
  }

  static removeAll(result) {
    pool.query("DELETE FROM entreprise", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} entreprises`);
      result(null, res);
    });
  }
}

export default Entreprise;