import React from "react";
import { Route, Routes } from 'react-router-dom'


//import routes
import Accueil from '../pages/Accueil';
import EnConstruction from '../pages/EnConstruction';
import EnConstruction1 from '../pages/EnConstruction1';
import EnConstruction2 from '../pages/EnConstruction2';
import EnConstruction3 from '../pages/EnConstruction3';
import EnConstruction4 from '../pages/EnConstruction4';
import EnConstruction5 from '../pages/EnConstruction5';
import EnConstruction6 from '../pages/EnConstruction6';

import Banques from "../pages/Banques/Banques";
import Etudiants from "../pages/Etudiants/Etudiants";
import Entreprises from "../pages/Entreprises/Entreprises";
import Enseignants from "../pages/Enseignants/Enseignants";
import Autorisations from "../pages/Autorisations";

const RoutesPages = () => {
    return (
        <div className="page">
            <Routes>
                <Route exact path="/" element={<Accueil />} />
                <Route exact path="/EnConstruction" element={<EnConstruction />} />
                <Route exact path="/EnConstruction1" element={<EnConstruction1 />} />
                <Route exact path="/EnConstruction2" element={<EnConstruction2 />} />
                <Route exact path="/EnConstruction3" element={<EnConstruction3 />} />
                <Route exact path="/EnConstruction4" element={<EnConstruction4 />} />
                <Route exact path="/EnConstruction5" element={<EnConstruction5 />} />
                <Route exact path="/EnConstruction6" element={<EnConstruction6 />} />

                <Route exact path="/banques" element={<Banques />} />
                <Route exact path="/etudiants" element={<Etudiants />} />
                <Route exact path="/entreprises" element={<Entreprises />} />
                <Route exact path="/enseignants" element={<Enseignants />} />
                <Route exact path="/Autorisations" element={<Autorisations />} />
            </Routes>
        </div>
    )
}
export default RoutesPages; 