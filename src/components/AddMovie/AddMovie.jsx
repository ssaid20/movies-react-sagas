import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  Card,
  Box,
} from "@mui/material";

export default function AddMovie() {
  // State variables for form inputs
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedPoster, setSelectedPoster] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  // Hooks for dispatching actions and navigation
  const dispatch = useDispatch();
  const history = useHistory();

  // Handler to add a new movie
  const postMovie = () => {
    const newMovie = {
      title: selectedTitle,
      poster: selectedPoster,
      description: selectedDescription,
      genre_id: selectedGenre,
    };

    if (
      !selectedTitle ||
      !selectedPoster ||
      !selectedDescription ||
      !selectedGenre
    ) {
      alert("Please fill out all fields");
      return;
    }

    dispatch({ type: "ADD_MOVIE", payload: newMovie });
    history.push("/");
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, borderBottom: "2px solid #3f51b5" }}>
        <Typography variant="h2" color="textSecondary">Add New Movie</Typography>
        <Button variant="contained" color="primary" onClick={() => history.push("/")}>
          Cancel
        </Button>
      </Box>

      <Card sx={{ padding: 4, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)", borderRadius: "15px" }}>
        <TextField fullWidth label="Title" variant="outlined" margin="normal" value={selectedTitle} onChange={(e) => setSelectedTitle(e.target.value)} />
        <TextField fullWidth label="Poster URL" variant="outlined" margin="normal" value={selectedPoster} onChange={(e) => setSelectedPoster(e.target.value)} />
        <TextField
          fullWidth
          label="Genre"
          select
          variant="outlined"
          margin="normal"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <MenuItem value={1}>Adventure</MenuItem>
          <MenuItem value={2}>Animated</MenuItem>
          <MenuItem value={3}>Biographical</MenuItem>
          <MenuItem value={4}>Comedy</MenuItem>
          <MenuItem value={5}>Disaster</MenuItem>
          <MenuItem value={6}>Drama</MenuItem>
          <MenuItem value={7}>Epic</MenuItem>
          <MenuItem value={8}>Fantasy</MenuItem>
          <MenuItem value={9}>Musical</MenuItem>
          <MenuItem value={10}>Romantic</MenuItem>
          <MenuItem value={11}>Science Fiction</MenuItem>
          <MenuItem value={12}>Space Opera</MenuItem>
          <MenuItem value={13}>Superhero</MenuItem>
        </TextField>
        <TextField
          fullWidth
          rows={4}
          label="Description"
          variant="outlined"
          margin="normal"
          multiline
          value={selectedDescription}
          onChange={(e) => setSelectedDescription(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
          <Button variant="contained" color="secondary" size="large" onClick={postMovie}>
            Add Movie
          </Button>
        </Box>
      </Card>
    </Container>
  );
}