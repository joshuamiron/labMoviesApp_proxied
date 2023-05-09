import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AuthContext } from '../../contexts/authContext';

const LoginModal = ({ open, handleClose }) => {
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
        return <Navigate to={"/"} />;
    }
    
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Sign in
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
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
                    <br /><br />
                    <DialogContentText>
                        Don't have an account?{" "}
                        <Link to="/signup">
                            Sign up!
                        </Link>
                    </DialogContentText>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" onClick={login}>Sign in</Button>
                </DialogActions>
                </DialogContent>

            </Dialog>
        </>
    );
};

export default LoginModal;
