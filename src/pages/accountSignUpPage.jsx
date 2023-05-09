import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, FormGroup, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import { AuthContext } from '../contexts/authContext';

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const register = () => {
    if (password.length > 0 && password === passwordAgain) {
      console.log("reg")
      context.register(email, password, firstName, lastName);
      setRegistered(true);
    }
  }

  // const { from } = props.location.state || { from: { pathname: "/" } };

  if (registered === true) {
    return <Navigate to="./home" />;
  }

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" style={{ marginTop: "50px" }}  >
        <FormControl>
          <Typography variant="h5">Sign up</Typography>
          <br /><br />
          <TextField
            autoFocus
            margin="dense"
            id="first name"
            label="First name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="last name"
            label="Last name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            id="confirm password"
            label="Confirm password"
            type="password"
            fullWidth
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <br />
          <Button variant="outlined" onClick={register}>Create account</Button>
          <br /><br />
          <Typography>Already have an account?{" "}
            <Link to="/login">Log in!</Link></Typography>
        </FormControl>
      </Grid>
    </>
  );
};

export default SignUpPage;
