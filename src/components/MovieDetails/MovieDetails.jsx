import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  Card,
  TextField,
  Box,
} from "@mui/material";

export default function MovieDetails() {
  // Hooks for navigation, dispatching actions, and accessing route parameters
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  // Local state for edit mode and movie details
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Fetch movie details on component mount
  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: params });
  }, []);

  // Access movie details from the Redux store
  const movie = useSelector((store) => store.details[0]);

  // Handle saving changes to movie details
  const saveChanges = () => {
    dispatch({
      type: "EDIT_MOVIE",
      payload: {
        id: movie.id,
        update: {
          title: newTitle,
          description: newDesc,
        },
      },
    });
    setEditMode(false);
  };

  // Toggle between edit and view modes
  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
        <Typography variant="h2" color="primary">
          Movie Details
        </Typography>
      </Box>

      {movie && (
        <Card sx={{ padding: 3, backgroundColor: "#0b1f56" }}>
          <Grid container spacing={6}>
            <Grid item xs={3}>
              <img
                className="posterDetails"
                src={movie.poster}
                alt={movie.title}
              />
            </Grid>
            <Grid item xs={8}>
              {editMode ? (
                <TextField
                  fullWidth
                  label="New Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              ) : (
                <Typography variant="h3" color="textSecondary">
                  {movie.title}
                </Typography>
              )}

              <Typography variant="h5" color="textSecondary">
                {movie.genre}
              </Typography>

              {editMode ? (
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  label="New Description"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              ) : (
                <Typography variant="body1" color="textSecondary">
                  {movie.description}
                </Typography>
              )}

              <Box sx={{ marginTop: "1rem" }}>
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={saveChanges}
                    >
                      Save
                    </Button>
                    <Button
                      sx={{ marginLeft: 1 }}
                      variant="outlined"
                      color="primary"
                      onClick={toggleEdit}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={toggleEdit}
                  >
                    Edit Movie
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => history.push("/")}
            >
              Go Back
            </Button>
          </Box>
        </Card>
      )}
    </Container>
  );
}
