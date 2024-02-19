import Etudiant from "../models/etudiant.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const etudiant = new Etudiant({
    matricule: req.body.matricule,
    nom: req.body.nom,
    prenom: req.body.prenom,
    date_naissance: req.body.date_naissance,
    lieu_naissance: req.body.lieu_naissance,
    presume: req.body.presume,
    wilaya_naissance: req.body.wilaya_naissance,
    adresse: req.body.adresse,
    email: req.body.email,
    mob1: req.body.mob1,
    mob2: req.body.mob2,
    sexe: req.body.sexe,
    type: req.body.type,
    nom_ar: req.body.nom_ar,
    prenom_ar: req.body.prenom_ar,
    nationalite: req.body.nationalite,
    niveau_acces: req.body.niveau_acces,
    groupe_sanguin: req.body.groupe_sanguin,
    prenom_pere: req.body.prenom_pere,
    prenom_pere_ar: req.body.prenom_pere_ar,
    nom_mere: req.body.nom_mere,
    nom_mere_ar: req.body.nom_mere_ar,
    prenom_mere: req.body.prenom_mere,
    prenom_mere_ar: req.body.prenom_mere_ar,
    profession_pere: req.body.profession_pere,
    profession_mere: req.body.profession_mere,
    photo: req.body.photo,
  });

  Etudiant.create(etudiant, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Etudiant."
      });
    else res.send(data);
  });
};

export const findAll = (req, res) => {
  const nom = req.query.nom;

  Etudiant.getAll(nom, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving etudiants."
      });
    else res.send(data);
  });
};

export const findOne = (req, res) => {
  Etudiant.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Etudiant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Etudiant with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

export const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Etudiant.updateById(
    req.params.id,
    new Etudiant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Etudiant with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Etudiant with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

export const deleteById = (req, res) => {
  Etudiant.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Etudiant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Etudiant with id " + req.params.id
        });
      }
    } else res.send({ message: `Etudiant was deleted successfully!` });
  });
};

export const deleteAll = (req, res) => {
  Etudiant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all etudiants."
      });
    else res.send({ message: `All Etudiants were deleted successfully!` });
  });
};
