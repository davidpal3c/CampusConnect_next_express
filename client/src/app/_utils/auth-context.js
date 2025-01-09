'use client';

import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signOutFirebase = () => {
    return signOut(auth);
  };

  const getIdToken = async () => {
    if (!user) {
      console.log("getIdToken called but user is not set yet.");
      return null;
    }
    try {
        const token = await user.getIdToken(true);
        console.log("ID token fetched", token);
        return token;        
    } catch (error) {
      console.error("Error fetching ID token", error);
      return null;
    }
    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("Auth state changed. Current user:", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, signOutFirebase, getIdToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};