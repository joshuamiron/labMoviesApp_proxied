import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";

import { getRecommendedMovies } from "../../api/api";
import MovieCardSmall from "../movieCardSmall";
import PlaylistAddIcon from '../cardIcons/addToPlaylist'

const RecommendedMovies = ({ movie }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    getRecommendedMovies(movie.id).then((movies) => {
      setRecommendedMovies(movies);
    })
    .catch((error) => {
    });
  }, [movie.id]);

  return (
    <>
      <Paper>
        <Typography variant="h6" component="h3">
          Recommended movies, based on people who liked this movie:
        </Typography>
        <br></br>
        <div style={{ overflowX: "scroll" }}>
          <Grid container sx={{ display: "inline-flex", flexWrap: "nowrap" }}>
            {recommendedMovies.map((movie) => (
              <Grid item key={movie.id} sx={{ flex: "0 0 auto" }}>
                <div style={{ width: 200 }}>
                  <MovieCardSmall action={(movie) => {
                    return <PlaylistAddIcon movie={movie}></PlaylistAddIcon>
                  }} movie={movie} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Paper>
    </>
  );
};
export default RecommendedMovies;
