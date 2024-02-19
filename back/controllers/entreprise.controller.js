import Entreprise from "../models/entreprise.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const entreprise = new Entreprise({
    nom: req.body.nom,
    adresse: req.body.adresse,
    tel: req.body.tel,
    contact: req.body.contact
  });

  Entreprise.create(entreprise, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Entreprise."
      });
    else res.send(data);
  });
};

export const findAll = (req, res) => {
  const nom = req.query.nom;

  Entreprise.getAll(nom, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving entreprises."
      });
    else res.send(data);
  });
};

export const findOne = (req, res) => {
  Entreprise.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entreprise with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entreprise with id " + req.params.id
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

  Entreprise.updateById(
    req.params.id,
    new Entreprise(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Entreprise with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Entreprise with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

export const deleteById = (req, res) => {
  Entreprise.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entreprise with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Entreprise with id " + req.params.id
        });
      }
    } else res.send({ message: `Entreprise was deleted successfully!` });
  });
};

export const deleteAll = (req, res) => {
  Entreprise.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all entreprises."
      });
    else res.send({ message: `All Entreprises were deleted successfully!` });
  });
};
