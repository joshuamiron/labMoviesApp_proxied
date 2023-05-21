import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddToPlaylistIcon from "@mui/icons-material/PlaylistAdd";
import RemoveFromPlaylistIcon from "@mui/icons-material/PlaylistRemove";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import Link from '@mui/material/Link';

import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { updatePlaylist } from '../../api/api'; // Import the updatePlaylist API call

const PlaylistAddIcon = ({ movie }) => {
  const {isAuthenticated, email } = useContext(AuthContext);
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false); // State to control the visibility of the popup
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  // ------------------------------------------------------------
  // --- From when I was just storing everything in local context
  // ------------------------------------------------------------

  /* const onUserSelect = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
  };*/

  const onUserSelect = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      console.log("User not logged in.");
      handleOpen();
      return;
    }
    const movieId = movie.id;
    try {
      const response = await updatePlaylist(movieId, email);
      if (response.ok) {
        console.log("Movie playlist updated:", response.data);
        if (isMovieInPlaylist) {
          console.log("Movie removed form playlist:", response.data);
          context.addToPlaylist(movie);
        } else {
          console.log("Movie added to playlist:", response.data);
          context.addToPlaylist(movie);
        }
      } else {
        console.error("Else: Failed to update movie playlist:", response.statusText);
        // Handle error, e.g., display an error message
      }
    } catch (error) {
      console.error("Catch: Failed to update movie playlist:", error.message);
      // Handle error, e.g., display an error message
    }
  };

  //---- Check if the movie is already in the playlist
  const isMovieInPlaylist = context.playlist.includes(movie.id);

  //---- If the movie is in the playlist, show the remove button. Otherwise show the add button.
  return (
  <>
    <IconButton aria-label="add to playlist" onClick={onUserSelect}>
      {isMovieInPlaylist ? (
        <RemoveFromPlaylistIcon color="secondary" fontSize="medium" />
      ) : (
        <AddToPlaylistIcon color="primary" fontSize="medium" />
      )}
    </IconButton>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>You must sign in</DialogTitle>
    <DialogContent>
      <Typography>
      Please{" "}<Link href="/login" underline="hover">sign in</Link>{" "}to add movies to your playlist.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>Close</Button>
    </DialogActions>
  </Dialog>
  </>
  );
};

export default PlaylistAddIcon;
