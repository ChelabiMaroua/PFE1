// import enseignant from "../controllers/enseignant.controller.js";
import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/enseignant.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new Enseignant
    router.post("/", create);
  
    // Retrieve all Enseignants
    router.get("/", findAll);
  
    // Retrieve a single Enseignant with id
    router.get("/:id", findOne);
  
    // Update a Enseignant with id
    router.put("/:id", update);
  
    // Delete a Enseignant with id
    router.delete("/:id", deleteById);
  
    // Delete all Enseignants
    router.delete("/", deleteAll);
  
    app.use('/api/enseignant', router);
  };
  