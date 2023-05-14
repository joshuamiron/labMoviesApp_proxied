import React, { useState, createContext } from "react";
import { authenticateAccount, createAccount, getAccount } from "../api/api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accountId, setAccountId] = useState("");

    //Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    const authenticate = async (email, password) => {
        const result = await authenticateAccount(email, password);
        if (result.token) {
            setToken(result.token)
            setIsAuthenticated(true);
            setEmail(email);
           // Get user info
            const user = await getAccount(email);
            // Set user info
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    };

     const register = async (email, password, firstName, lastName) => {
        const result = await createAccount(email, password, firstName, lastName);
        //setFirstName(firstName);
        //setLastName(lastName);
        return (result.code == 201) ? true : false;
    };


    const signout = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                register,
                signout,
                email,
                firstName,
                lastName,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
