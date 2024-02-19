import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import logo from '../static/ESST_logo.png';
import "./Style.css";

const Home = () => (
  <Box sx={{ width: '100%', maxWidth: 2000 }}>
    <Typography component="div" variant="h8" className='Accueil'>
      Mon application de gestion de la scolarité commence à prendre forme petit à petit. <br />
      Je sais que ce n'est pas évident quand on est trop exigeant, mais ce n'est pas impossible non plus.<br /><br />
      Le projet de cette 2ème version a débuté le 02 juillet 2019 et depuis j'ai testé plusieurs environnements de développement.<br />
      Dans un premier temps j'avais choisi le framework Django. La première maquette a été testée le 17 août 2022 avec un full stack en Django <br />
      Ensuite, j'ai découvert le monde de Node.js et donc de React.js pour le frontend avec le frameword Express pour le backend.<br/>
      J'abandonne donc Django au profit de Node.js<br />
      La maquette a été mise à jour en full stack React.js et Node.js le 28 juin 2023 - 1er jour de l'Aid El Adha -<br />
      Les outils que j'ai utilisé sont : React.js pour le frontend, Node.js avec Express pour le backend. La BDD tourne sous MariaDB<br />
    </Typography>
    <div className='img'>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <Typography component="div" variant="h9" className='Accueil2'>
      Je fume du thé et je reste éveillé, le cauchemar continue...
    </Typography>
  </Box>
)

export default Home