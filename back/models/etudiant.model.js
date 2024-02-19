import pool from "./db.js";

class Etudiant {
  constructor(etudiant) {
    this.matricule = etudiant.matricule
    this.nom = etudiant.nom
    this.prenom = etudiant.prenom
    this.date_naissance = this.formatDate(etudiant.date_naissance)
    this.lieu_naissance = etudiant.lieu_naissance
    this.presume  = etudiant.presume
    this.wilaya_naissance = etudiant.wilaya_naissance
    this.adresse = etudiant.adresse
    this.email = etudiant.email
    this.mob1 = etudiant.mob1
    this.mob2 = etudiant.mob2
    this.sexe = etudiant.sexe
    this.type = etudiant.type
    this.nom_ar = etudiant.nom_ar
    this.prenom_ar = etudiant.prenom_ar
    this.nationalite = etudiant.nationalite
    this.niveau_acces = etudiant.niveau_acces
    this.groupe_sanguin = etudiant.groupe_sanguin
    this.prenom_pere = etudiant.prenom_pere
    this.prenom_pere_ar = etudiant.prenom_pere_ar
    this.nom_mere = etudiant.nom_mere
    this.nom_mere_ar = etudiant.nom_mere_ar
    this.prenom_mere = etudiant.prenom_mere
    this.prenom_mere_ar = etudiant.prenom_mere_ar
    this.profession_pere = etudiant.profession_pere
    this.profession_mere = etudiant.profession_mere
    this.photo = etudiant.photo
  }

  formatDate(date) {
    if (!date) return null;
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }

  static create(newEtudiant, result) {
    pool.query("INSERT INTO etudiant SET ?", newEtudiant, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created etudiant: ", { id: res.insertId, ...newEtudiant });
      result(null, { id: res.insertId, ...newEtudiant });
      console.log('cest Ok !!!');
    });
  }

  static findById(id, result) {
    pool.query(`SELECT * FROM etudiant WHERE id_etudiant = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found etudiant: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Etudiant with the id
      result({ kind: "not_found" }, null);
    });
  }

  static getAll(nom, result) {
    let query = "SELECT id_etudiant, matricule, nom, prenom, DATE_FORMAT(date_naissance, '%d-%m-%Y') AS date_naissance, lieu_naissance, presume, wilaya_naissance, adresse, email, mob1, mob2, sexe, type, nom_ar, prenom_ar, nationalite, niveau_acces, groupe_sanguin, prenom_pere, prenom_pere_ar, nom_mere, nom_mere_ar, prenom_mere, prenom_mere_ar, profession_pere, profession_mere, photo FROM etudiant";

    if (nom) {
      query += ` WHERE nom LIKE '%${nom}%'`;
    }

    pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("etudiants: ", res);
      result(null, res);
    });
  }

  static updateById(id, etudiant, result) {
    pool.query(
      "UPDATE etudiant SET \
      matricule  = ?, \
      nom  = ?, \
      prenom  = ?, \
      date_naissance  = ?, \
      lieu_naissance  = ?, \
      presume  = ?, \
      wilaya_naissance  = ?, \
      adresse  = ?, \
      email  = ?, \
      mob1  = ?, \
      mob2  = ?, \
      sexe  = ?, \
      type  = ?, \
      nom_ar  = ?, \
      prenom_ar  = ?, \
      nationalite  = ?, \
      niveau_acces  = ?, \
      groupe_sanguin  = ?, \
      prenom_pere  = ?, \
      prenom_pere_ar  = ?, \
      nom_mere  = ?, \
      nom_mere_ar  = ?, \
      prenom_mere  = ?, \
      prenom_mere_ar  = ?, \
      profession_pere  = ?, \
      profession_mere  = ?, \
      photo  = ? \
      WHERE id_etudiant = ?",
      [
        etudiant.matricule,
        etudiant.nom,
        etudiant.prenom,
        etudiant.date_naissance,
        etudiant.lieu_naissance,
        etudiant.presume,
        etudiant.wilaya_naissance,
        etudiant.adresse,
        etudiant.email,
        etudiant.mob1,
        etudiant.mob2,
        etudiant.sexe,
        etudiant.type,
        etudiant.nom_ar,
        etudiant.prenom_ar,
        etudiant.nationalite,
        etudiant.niveau_acces,
        etudiant.groupe_sanguin,
        etudiant.prenom_pere,
        etudiant.prenom_pere_ar,
        etudiant.nom_mere,
        etudiant.nom_mere_ar,
        etudiant.prenom_mere,
        etudiant.prenom_mere_ar,
        etudiant.profession_pere,
        etudiant.profession_mere,
        etudiant.photo, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Etudiant with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated etudiant: ", { id: id, ...etudiant });
        result(null, { id: id, ...etudiant });
      }
    );
  }

  static remove(id, result) {
    pool.query("DELETE FROM etudiant WHERE id_etudiant = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Etudiant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted etudiant with id: ", id);
      result(null, res);
    });
  }

  static removeAll(result) {
    pool.query("DELETE FROM etudiant", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} etudiants`);
      result(null, res);
    });
  }
}

export default Etudiant;