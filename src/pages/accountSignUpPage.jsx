import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import { AuthContext } from "../contexts/authContext";

const SignUpPage = (props) => {
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const register = () => {
    if (password.length > 0 && password === passwordAgain) {
      console.log(firstName + " " + lastName + " registered successfully");
      context.register(email, password, firstName, lastName);
      setRegistered(true);
    }
  };
  

  // const { from } = props.location.state || { from: { pathname: "/" } };

  if (registered === true) {
    //if (context.isAuthenticated === true) {
    //}
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "50px" }}
      >
        <FormControl>
          <Typography variant="h5">Sign up</Typography>
          <br />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="first name"
            label="First name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: "300px" }} // Set a fixed width for the text field
          />
          <TextField
            margin="dense"
            id="last name"
            label="Last name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: "300px" }} // Set a fixed width for the text field
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "300px" }} // Set a fixed width for the text field
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "300px" }} // Set a fixed width for the text field
          />
          <TextField
            margin="dense"
            id="confirm password"
            label="Confirm password"
            type="password"
            fullWidth
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            style={{ width: "300px" }} // Set a fixed width for the text field
          />
          <br />
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          <br />
          <Button variant="outlined" onClick={register}>
            Create account
          </Button>
          <br />
          <br />
          <Typography>
            Already have an account? <Link to="/login">Log in!</Link>
          </Typography>
        </FormControl>
      </Grid>
    </>
  );
};

export default SignUpPage;
