import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, FormGroup, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import { AuthContext } from '../contexts/authContext';

const LoginPage = props => {
    const context = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(email, password);
    };

    // Set 'from' to path where browser is redirected after a successful login.
    // Either / or the protected path user tried to access.
    // const { from } = props.location.state || { from: { pathname: "/" } };

    if (context.isAuthenticated === true) {
        return <Navigate to={"./home"} />;
    }

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: "50px" }}>
                <FormControl>
                    <Typography variant="h5">Sign in</Typography>
                    <br /><br />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <Button variant="outlined" onClick={login}>Sign in</Button>
                    <br /><br />
                    <Typography>Don't have an account? {" "}
                        <Link to="/signup">Sign up!</Link></Typography>
                </FormControl>
            </Grid>
        </>
    );
};

export default LoginPage;
