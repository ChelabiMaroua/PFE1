import  express from "express"
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Bienvenue sur new ISA !!")
})

import utilisateursRoutes from "./routes/utilisateurs.routes.js";
utilisateursRoutes(app);

import banqueRoutes from "./routes/banque.routes.js";
banqueRoutes(app);

import etudiantRoutes from "./routes/etudiant.routes.js";
etudiantRoutes(app);

import entrepriseRoutes from "./routes/entreprise.routes.js";
entrepriseRoutes(app);

import enseignantRoutes from "./routes/enseignant.routes.js";
enseignantRoutes(app);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });