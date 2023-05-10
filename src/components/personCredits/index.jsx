import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import MovieCardSmall from "../movieCardSmall";
import { getPersonCredits } from "../../api/api";
import PlaylistAddIcon from '../cardIcons/addToPlaylist'
import Paper from "@mui/material/Paper";

const PersonCredits = ({ person }) => {
  const [personCredits, setPersonCredits] = useState([]);

  /* useEffect(() => {
    getPersonCredits(person.id).then((credits) => {
      setPersonCredits(credits);
    });
  }, [person.id]);*/
  
  useEffect(() => {
    getPersonCredits(person.id).then((credits) => {
        console.log("Response from getPersonCredits:", credits);
        setPersonCredits(credits);
      })
      .catch((error) => {
        console.error("Error in getPersonCredits:", error);
      });
  }, [person.id]);

  console.log("personCredits:", personCredits);

  return (
    <>
      <Paper>
        <Typography variant="h6" component="h3">
          Credits
        </Typography>
        <br></br>
        <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
          <Grid container sx={{ display: "inline-flex", flexWrap: "nowrap" }}>
            {personCredits.map((movie) => (
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
export default PersonCredits;
