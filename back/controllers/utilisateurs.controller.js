import Utilisateur from "../models/utilisateurs.model.js";

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const utilisateur = new Utilisateur({
        email: req.body.email,
        mot_de_passe: req.body.mot_de_passe,
        role: req.body.role
    });

    Utilisateur.create(utilisateur, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Utilisateur."
            });
        else res.send(data);
    });
};

export const findAll = (req, res) => {
    const email = req.query.email;

    Utilisateur.getAll(email, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving utilisateurs."
            });
        else res.send(data);
    });
};

export const findOne = (req, res) => {
    Utilisateur.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Utilisateur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Utilisateur with id " + req.params.id
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

    Utilisateur.updateById(
        req.params.id,
        new Utilisateur(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Utilisateur with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Utilisateur with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteById = (req, res) => {
    Utilisateur.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Utilisateur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Utilisateur with id " + req.params.id
                });
            }
        } else res.send({ message: `Utilisateur was deleted successfully!` });
    });
};

export const deleteAll = (req, res) => {
    Utilisateur.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all utilisateurs."
            });
        else res.send({ message: `All Utilisateurs were deleted successfully!` });
    });
};
