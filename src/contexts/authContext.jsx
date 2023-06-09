import React, { useState, createContext, useContext } from "react";
import { authenticateAccount, createAccount, getAccount } from "../api/api";
import { MoviesContext } from "./moviesContext";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setAccountId] = useState("");
  const moviesContext = useContext(MoviesContext);

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  /* const authenticate = async (email, password) => {
    const result = await authenticateAccount(email, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      // Get user info
      const user = await getAccount(email);
      // Set user info
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAccountId(user.id);
      // Set favourites in MoviesContext
      moviesContext.setFavourites(user.favourites);
      moviesContext.setPlaylist(user.playlist);
      moviesContext.setFavouritePeople(user.favouritepeople);
      moviesContext.setMyMadeupMovies(user.madeupmovies);
    }
};*/

const authenticate = async (email, password) => {
  try {
    const result = await authenticateAccount(email, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      // Get user info
      const user = await getAccount(email);
      // Set user info
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAccountId(user.id);
      // Set favourites in MoviesContext
      moviesContext.setFavourites(user.favourites);
      moviesContext.setPlaylist(user.playlist);
      moviesContext.setFavouritePeople(user.favouritepeople);
      moviesContext.setMyMadeupMovies(user.madeupmovies);
      return result;
    }
  } catch (error) {
    if (error.reponse && error.response.data === 401) {
      throw new Error("Unauthorized.");
    } else {
      throw new Error("Sign in failed. Please try again.");
    }
  }
};

  /* const register = async (email, password, firstName, lastName) => {
    const result = await createAccount(email, password, firstName, lastName);
    return result.code == 201 ? true : false;
  };*/

  const register = async (email, password, firstName, lastName) => {
    try {
      const result = await createAccount(email, password, firstName, lastName);
      return result;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        throw new Error("Account already exists.");
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    }
  };
  

  
  const signout = () => {
    moviesContext.resetMoviesContext();
    setTimeout(() => setIsAuthenticated(false), 100);
    setEmail("");
    setFirstName("");
    setLastName("");
    setAccountId("");
    // Reset the MoviesContext
};

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
        id,
      }}
    >
            {props.children}  
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
