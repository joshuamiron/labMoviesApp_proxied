import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import { AuthContext } from "../contexts/authContext";

const LoginPage = (props) => {
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    setErrorMessage(""); // Reset the error message
    try {
      const result = await context.authenticate(email, password); // Make the login request to the server
      // If the response status is 401 (unauthorized), display the error message
      // This isn't working correctly for some reason - its going right to the catch block.
      if (result.message === "Unauthorized") {
        setErrorMessage(result.message);
      } else {
        // Login successful, redirect to the home page
        return <Navigate to={"/"} />;
      }
    } catch (error) {
      console.log(error);
      if (error && error.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    }
  };

  // Set 'from' to path where browser is redirected after a successful login.
  // Either / or the protected path user tried to access.
  // const { from } = props.location.state || { from: { pathname: "/" } };

   if (context.isAuthenticated === true) {
    return <Navigate to={"/"} />;
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
          <Typography variant="h5">Sign in</Typography>
          <br />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "300px" }} // Set a fixed width for the text field
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "300px" }} // Set a fixed width for the text field
          />
          {errorMessage && (
            <Typography color="error" variant="body1">
              {errorMessage}
            </Typography>
          )}
          <br />
          <Button variant="outlined" onClick={login}>
            Sign in
          </Button>
          <br />
          <br />
          <Typography>
            Don't have an account? <Link to="/signup">Sign up!</Link>
          </Typography>
        </FormControl>
      </Grid>
    </>
  );
};

export default LoginPage;
