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

const NotSignedInModal = ({ open, handleClose }) => {
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
                    Not signed in
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You need to be signed in to save a movie to your favourites.
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

export default NotSignedInModal;
