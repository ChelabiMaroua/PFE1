// import entreprise from "../controllers/entreprise.controller.js";
import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/entreprise.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new Entreprise
    router.post("/", create);
  
    // Retrieve all Entreprises
    router.get("/", findAll);
  
    // Retrieve a single Entreprise with id
    router.get("/:id", findOne);
  
    // Update a Entreprise with id
    router.put("/:id", update);
  
    // Delete a Entreprise with id
    router.delete("/:id", deleteById);
  
    // Delete all Entreprises
    router.delete("/", deleteAll);
  
    app.use('/api/entreprise', router);
  };
  