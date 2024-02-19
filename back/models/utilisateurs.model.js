import pool from "./db.js";

class Utilisateur {
    constructor(utilisateur) {
        this.id = utilisateur.id;
        this.email = utilisateur.email;
        this.mot_de_passe = utilisateur.mot_de_passe;
        this.role = utilisateur.role;
    }

    static create(newUtilisateur, result) {
        pool.query("INSERT INTO utilisateur SET ?", newUtilisateur, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created utilisateur: ", { id: res.insertId, ...newUtilisateur });
            result(null, { id: res.insertId, ...newUtilisateur });
        });
    }

    static findById(id, result) {
        pool.query(`SELECT * FROM utilisateur WHERE id = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found utilisateur: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Utilisateur with the id
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(email, result) {
        let query = "SELECT * FROM utilisateur";

        if (email) {
            query += ` WHERE email LIKE '%${email}%'`;
        }

        pool.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("utilisateurs: ", res);
            result(null, res);
        });
    }

    static updateById(id, utilisateur, result) {
        pool.query(
            "UPDATE utilisateur SET email = ?, mot_de_passe = ?, role = ? WHERE id_utilisateur = ?",
            [utilisateur.email, utilisateur.mot_de_passe, utilisateur.role, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found Utilisateur with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated utilisateur: ", { id: id, ...utilisateur });
                result(null, { id: id, ...utilisateur });
            }
        );
    }

    static remove(id, result) {
        pool.query("DELETE FROM utilisateur WHERE id_utilisateur = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Utilisateur with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted utilisateur with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        pool.query("DELETE FROM utilisateur", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} utilisateur`);
            result(null, res);
        });
    }
}

export default Utilisateur;
