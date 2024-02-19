// import * as React from 'react';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
//Icons
import HomeIcon from '@mui/icons-material/Home';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import Tune from '@mui/icons-material/Tune';
import CreditCard from '@mui/icons-material/CreditCard';
import DateRange from '@mui/icons-material/DateRange';
import HowToReg from '@mui/icons-material/HowToReg';
import School from '@mui/icons-material/School';
import AccountBalance from '@mui/icons-material/AccountBalance';
import Business from '@mui/icons-material/Business';
import FactoryIcon from '@mui/icons-material/Factory';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import PlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck';
import FolderShared from '@mui/icons-material/FolderShared';
import Spellcheck from '@mui/icons-material/Spellcheck';
import ThumbDownAlt from '@mui/icons-material/ThumbDownAlt';
import BusinessCenter from '@mui/icons-material/BusinessCenter';
import Person from '@mui/icons-material/Person';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Security from '@mui/icons-material/Security';
import Lock from '@mui/icons-material/Lock';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';



import RoutesPages from '../../services/Routes'
import { Link } from 'react-router-dom'

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const listItemStyle = {
  display: 'block',
};

const listItemButtonStyle = {
  height: 35,
  justifyContent: open ? 'initial' : 'center',
  px: 2.5,
};

const listItemButtonSmStyle = {
  marginLeft: 0,
  paddingLeft: 3,
  borderBottom: '1px solid blue',
  height: 35,
  width: 185,
};

const listItemIconStyle = {
  minWidth: 0,
  mr: open ? 3 : 'auto',
  justifyContent: 'center',
};

const listItemTextStyle = {
  opacity: open ? 1 : 0,
};

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleOpen1 = () => {
    setOpen2(false);
    setOpen1(!open1);
  };
  const handleOpen2 = () => {
    setOpen1(false);
    setOpen2(!open2);
  };
  const handleOpen = () => {
    setOpen2(false);
    setOpen1(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h7" noWrap component="div">
            ESST Schooling Administration Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={listItemStyle}>
            <ListItemButton sx={listItemButtonStyle} onClick={handleOpen} component={Link} to="/">
              <ListItemIcon sx={listItemIconStyle}><HomeIcon /></ListItemIcon>
              <ListItemText sx={listItemTextStyle} primary="Accueil" />
            </ListItemButton>
            <ListItemButton sx={listItemButtonStyle} onClick={handleOpen} component={Link} to="/etudiants">
              <ListItemIcon sx={listItemIconStyle}><HowToReg /></ListItemIcon>
              <ListItemText sx={listItemTextStyle} primary="Admission" />
            </ListItemButton>
            <ListItemButton sx={listItemButtonStyle} onClick={handleOpen1}>
              <ListItemIcon sx={listItemIconStyle}><School /></ListItemIcon>
              <ListItemText sx={listItemTextStyle} primary="Scolarité" />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={listItemButtonSmStyle} component={Link} to="/fichier">
                  <ListItemIcon sx={listItemIconStyle}><FolderShared /></ListItemIcon>
                  <ListItemText sx={listItemTextStyle} primary="Fichier Étudiant" />
                </ListItemButton>
                <ListItemButton sx={listItemButtonSmStyle} component={Link} to="/EnConstruction1">
                  <ListItemIcon sx={listItemIconStyle}><Spellcheck /></ListItemIcon>
                  <ListItemText sx={listItemTextStyle} primary="Assiduité" />
                </ListItemButton>
                <ListItemButton sx={listItemButtonSmStyle} component={Link} to="/EnConstruction2">
                  <ListItemIcon sx={listItemIconStyle}><PlaylistAddCheck /></ListItemIcon>
                  <ListItemText sx={listItemTextStyle} primary="Évaluation" />
                </ListItemButton>
                <ListItemButton sx={listItemButtonSmStyle} component={Link} to="/EnConstruction3">
                  <ListItemIcon sx={listItemIconStyle}><ThumbDownAlt /></ListItemIcon>
                  <ListItemText sx={listItemTextStyle} primary="Sanction" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton sx={listItemButtonStyle} onClick={handleOpen} component={Link} to="/EnConstruction4">
              <ListItemIcon sx={listItemIconStyle}><DateRange /></ListItemIcon>
              <ListItemText sx={listItemTextStyle} primary="Plannings" />
            </ListItemButton>
            <ListItemButton sx={listItemButtonStyle} onClick={handleOpen} component={Link} to="/enseignants">
              <ListItemIcon sx={listItemIconStyle}><Person /></ListItemIcon>
              <ListItemText sx={listItemTextStyle} primary="Enseignants" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItemButton sx={listItemButtonStyle} onClick={handleOpen} component={Link} to="/EnConstruction6">
            <ListItemIcon sx={listItemIconStyle}><CreditCard /></ListItemIcon>
            <ListItemText sx={listItemTextStyle} primary="Finance" />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton sx={listItemButtonStyle} onClick={handleOpen2}>
            <ListItemIcon sx={listItemIconStyle}><Tune /></ListItemIcon>
            <ListItemText sx={listItemTextStyle} primary="Fichiers" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={listItemButtonSmStyle} component={Link} to="/EnConstruction">
                <ListItemIcon sx={listItemIconStyle}><BusinessCenter /></ListItemIcon>
                <ListItemText sx={listItemTextStyle} primary="Formation" />
              </ListItemButton>
              <ListItemButton sx={listItemButtonSmStyle} component={Link} to="/EnConstruction">
                <ListItemIcon sx={listItemIconStyle}><LibraryBooks /></ListItemIcon>
                <ListItemText sx={listItemTextStyle} primary="Programmes" />
              </ListItemButton>
              <ListItemButton sx={listItemButtonSmStyle} component={Link} to="/EnConstruction">
                <ListItemIcon sx={listItemIconStyle}><PeopleAlt /></ListItemIcon>
                <ListItemText sx={listItemTextStyle} primary="Groupe" />
              </ListItemButton>
              <ListItemButton sx={listItemButtonSmStyle} component={Link} to="/banques">
                <ListItemIcon sx={listItemIconStyle}><AccountBalance /></ListItemIcon>
                <ListItemText sx={listItemTextStyle} primary="Banque" />
              </ListItemButton>
              <ListItemButton sx={listItemButtonSmStyle} component={Link} to="/entreprises">
                <ListItemIcon sx={listItemIconStyle}><FactoryIcon /></ListItemIcon>
                <ListItemText sx={listItemTextStyle} primary="Entreprise" />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
        <List>
          <ListItemButton sx={listItemButtonStyle} onClick={handleOpen} component={Link} to="/Autorisations">
            <ListItemIcon sx={listItemIconStyle}><Lock /></ListItemIcon>
            <ListItemText sx={listItemTextStyle} primary="Autorisations" />
          </ListItemButton>
        </List>
        <Divider />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          <RoutesPages />
        </Typography>
      </Box>
    </Box>
  );
}