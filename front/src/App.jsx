import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

import Menu from './components/menus/Menu.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { transform: 'translateZ(0)' },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  }
});

const AppMain = styled('div')({
  paddingLeft: '20px',
  width: '100%',
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppMain>
          <Menu />
        </AppMain>
      </ThemeProvider>
    </Router>
  );
}

export default App;
