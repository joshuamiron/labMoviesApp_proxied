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

const SignUpModal = ({ open, handleClose }) => {
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
    };

    // const { from } = props.location.state || { from: { pathname: "/" } };

    if (registered === true) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Sign up
                </DialogTitle>
                <DialogContent>
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
                        type="confirm password"
                        fullWidth
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                    />
                    <br /><br />
                    <DialogContentText>
                        Already have an account?{" "}
                        <Link to="/signup">
                            Sign in!
                        </Link>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="outlined" onClick={register}>Create account</Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </>
    );
};

export default SignUpModal;
