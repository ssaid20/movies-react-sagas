import { HashRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';

// MUI dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Typography variant="h1" align="center">
          <TheatersIcon fontSize="large" color="secondary" /> 
          the movies saga 
          <TheatersIcon fontSize="large" color="secondary" />
        </Typography>

        <Router>
          {/* route to Home */}
          <Route path="/" exact>
            <MovieList />
          </Route>

          {/* Route to Details page */}
          <Route path="/details/:id">
            <MovieDetails />
          </Route>

          {/* Route to Add Movie page */}
          <Route path="/add">
            <AddMovie />
          </Route>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

