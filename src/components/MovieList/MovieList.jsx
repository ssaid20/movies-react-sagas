import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Grid,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Tooltip,
  Container,
  Box,
} from "@mui/material";
import "./MovieList.css";

function MovieList() {
  // Redux hooks initialization
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  // React Router hook initialization for programmatic navigation
  const history = useHistory();

  // Fetch movies on component mount
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <Container>
      {/* Header section with title and Add Movie button */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between",
          backgroundColor: "#0b1f56",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem"
        }}
      >
        <Typography variant="h2" color="primary">Movies</Typography>
        <Button
          sx={{ m: 1, backgroundColor: "#3f51b5" }}
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => history.push("/add")}
        >
          Add Movie
        </Button>
      </Box>

      {/* Display movies in a grid format */}
      <Grid container sx={{ justifyContent: "center" }} spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={3} key={movie.id}>
            <Card sx={{ boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.3)" }}>
              <CardContent sx={{ textAlign: "center", backgroundColor: "#0b1f56" }}>
                <Typography variant="h6" color="primary">{movie.title}</Typography>
                {/* Tooltip provides additional context on hover */}
                <Tooltip title="Click for more details">
                  {/* CardActionArea provides a visual feedback on hover */}
                  <CardActionArea>
                    <img
                      className="moviePoster"
                      src={movie.poster}
                      alt={movie.title}
                      onClick={() => history.push(`/details/${movie.id}`)}
                    />
                  </CardActionArea>
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MovieList;

