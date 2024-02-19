import Enseignant from "../models/enseignant.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const enseignant = new Enseignant({
    nom: req.body.nom,
    prenom: req.body.prenom,
    date_naissance: req.body.date_naissance,
    lieu_naissance: req.body.lieu_naissance,
    wilaya_naissance: req.body.wilaya_naissance,
    adresse: req.body.adresse,
    email: req.body.email,
    mob1: req.body.mob1,
    mob2: req.body.mob2,
    nationalite: req.body.nationalite,
    civilite: req.body.civilite,
    groupe_sanguin: req.body.groupe_sanguin,
    date_recrutement: req.body.date_recrutement,
    date_cession: req.body.date_cession,
    type_form_consult: req.body.type_form_consult,
    type_perm_vacat: req.body.type_perm_vacat,
    diplome: req.body.diplome,
    specialite: req.body.specialite,
    observations: req.body.observations,
    photo: req.body.photo,
  });

  Enseignant.create(enseignant, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Enseignant."
      });
    else res.send(data);
  });
};

export const findAll = (req, res) => {
  const nom = req.query.nom;

  Enseignant.getAll(nom, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving enseignants."
      });
    else res.send(data);
  });
};

export const findOne = (req, res) => {
  Enseignant.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Enseignant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Enseignant with id " + req.params.id
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

  Enseignant.updateById(
    req.params.id,
    new Enseignant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Enseignant with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Enseignant with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

export const deleteById = (req, res) => {
  Enseignant.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Enseignant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Enseignant with id " + req.params.id
        });
      }
    } else res.send({ message: `Enseignant was deleted successfully!` });
  });
};

export const deleteAll = (req, res) => {
  Enseignant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all enseignants."
      });
    else res.send({ message: `All Enseignants were deleted successfully!` });
  });
};
