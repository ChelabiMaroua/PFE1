// import etudiant from "../controllers/etudiant.controller.js";
import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/etudiant.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new Etudiant
    router.post("/", create);
  
    // Retrieve all Etudiants
    router.get("/", findAll);
  
    // Retrieve a single Etudiant with id
    router.get("/:id", findOne);
  
    // Update a Etudiant with id
    router.put("/:id", update);
  
    // Delete a Etudiant with id
    router.delete("/:id", deleteById);
  
    // Delete all Etudiants
    router.delete("/", deleteAll);
  
    app.use('/api/etudiant', router);
  };
  