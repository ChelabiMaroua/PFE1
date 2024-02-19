// import banque from "../controllers/banque.controller.js";
import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/banque.controller.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new Banque
    router.post("/", create);
  
    // Retrieve all Banques
    router.get("/", findAll);
  
    // Retrieve a single Banque with id
    router.get("/:id", findOne);
  
    // Update a Banque with id
    router.put("/:id", update);
  
    // Delete a Banque with id
    router.delete("/:id", deleteById);
  
    // Delete all Banques
    router.delete("/", deleteAll);
  
    app.use('/api/banque', router);
  };
  