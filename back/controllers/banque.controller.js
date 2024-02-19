import Banque from "../models/banque.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const banque = new Banque({
    nom: req.body.nom,
    adresse: req.body.adresse,
    tel: req.body.tel
  });

  Banque.create(banque, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Banque."
      });
    else res.send(data);
  });
};

export const findAll = (req, res) => {
  const nom = req.query.nom;

  Banque.getAll(nom, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving banques."
      });
    else res.send(data);
  });
};

export const findOne = (req, res) => {
  Banque.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Banque with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Banque with id " + req.params.id
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

  Banque.updateById(
    req.params.id,
    new Banque(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Banque with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Banque with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

export const deleteById = (req, res) => {
  Banque.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Banque with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Banque with id " + req.params.id
        });
      }
    } else res.send({ message: `Banque was deleted successfully!` });
  });
};

export const deleteAll = (req, res) => {
  Banque.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all banques."
      });
    else res.send({ message: `All Banques were deleted successfully!` });
  });
};
