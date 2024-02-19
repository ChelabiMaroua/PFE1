import pool from "./db.js";

class Enseignant {
  constructor(enseignant) {
    this.nom = enseignant.nom
    this.prenom = enseignant.prenom
    this.date_naissance = enseignant.date_naissance
    this.lieu_naissance = enseignant.lieu_naissance
    this.wilaya_naissance = enseignant.wilaya_naissance
    this.adresse = enseignant.adresse
    this.email = enseignant.email
    this.mob1 = enseignant.mob1
    this.mob2 = enseignant.mob2
    this.nationalite = enseignant.nationalite
    this.civilite = enseignant.civilite
    this.groupe_sanguin = enseignant.groupe_sanguin
    this.date_recrutement = enseignant.date_recrutement
    this.date_cession = enseignant.date_cession
    this.type_form_consult = enseignant.type_form_consult
    this.type_perm_vacat = enseignant.type_perm_vacat
    this.diplome = enseignant.diplome
    this.specialite = enseignant.specialite
    this.observations = enseignant.observations
    this.photo = enseignant.photo
  }

  formatDate(date) {
    if (!date) return null;
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }

  static create(newEnseignant, result) {
    pool.query("INSERT INTO enseignant SET ?", newEnseignant, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created enseignant: ", { id: res.insertId, ...newEnseignant });
      result(null, { id: res.insertId, ...newEnseignant });
      console.log('cest Ok !!!');
    });
  }

  static findById(id, result) {
    pool.query(`SELECT * FROM enseignant WHERE id_enseignant = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found enseignant: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Enseignant with the id
      result({ kind: "not_found" }, null);
    });
  }

  static getAll(nom, result) {
    let query = "SELECT id_enseignant, nom, prenom, DATE_FORMAT(date_naissance, '%d-%m-%Y') AS date_naissance, lieu_naissance, wilaya_naissance, adresse, email, mob1, mob2, nationalite, civilite, groupe_sanguin, DATE_FORMAT(date_recrutement, '%d-%m-%Y') AS date_recrutement, DATE_FORMAT(date_cession, '%d-%m-%Y') AS date_cession, type_form_consult, type_perm_vacat, diplome, specialite, observations, photo FROM enseignant";

    if (nom) {
      query += ` WHERE nom LIKE '%${nom}%'`;
    }

    pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("enseignants: ", res);
      result(null, res);
    });
  }

  static updateById(id, enseignant, result) {
    pool.query(
      "UPDATE enseignant SET \
      nom  = ?, \
      prenom  = ?, \
      date_naissance  = ?, \
      lieu_naissance  = ?, \
      wilaya_naissance  = ?, \
      adresse  = ?, \
      email  = ?, \
      mob1  = ?, \
      mob2  = ?, \
      nationalite  = ?, \
      civilite = ?, \
      groupe_sanguin  = ?, \
      date_recrutement  = ?, \
      date_cession  = ?, \
      type_form_consult  = ?, \
      type_perm_vacat  = ?, \
      diplome  = ?, \
      specialite  = ?, \
      observations  = ?, \
      photo  = ? \
      WHERE id_enseignant = ?",
      [
        enseignant.nom,
        enseignant.prenom,
        enseignant.date_naissance,
        enseignant.lieu_naissance,
        enseignant.wilaya_naissance,
        enseignant.adresse,
        enseignant.email,
        enseignant.mob1,
        enseignant.mob2,
        enseignant.nationalite,
        enseignant.civilite,
        enseignant.groupe_sanguin,
        enseignant.date_recrutement,
        enseignant.date_cession,
        enseignant.type_form_consult,
        enseignant.type_perm_vacat,
        enseignant.diplome,
        enseignant.specialite,
        enseignant.observations,
        enseignant.photo, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Enseignant with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated enseignant: ", { id: id, ...enseignant });
        result(null, { id: id, ...enseignant });
      }
    );
  }

  static remove(id, result) {
    pool.query("DELETE FROM enseignant WHERE id_enseignant = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Enseignant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted enseignant with id: ", id);
      result(null, res);
    });
  }

  static removeAll(result) {
    pool.query("DELETE FROM enseignant", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} enseignants`);
      result(null, res);
    });
  }
}

export default Enseignant;