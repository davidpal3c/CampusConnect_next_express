'use client';

import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authUserLoading, setAuthUserLoading] = useState(true);
  const router = useRouter();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Immediately get and store the token
      const token = await result.user.getIdToken(true);
      const userWithToken = {
        ...result.user,
        currentToken: token
      };

      // Store user with token in localStorage
      localStorage.setItem("user", JSON.stringify({
        uid: result.user.uid,
        email: result.user.email,
        currentToken: token
      }));

      setUser(userWithToken);
      return result;
    } catch (error) {
      console.error("Google Sign In Error:", error);
      throw error;
    }
  };

  const signOutFirebase = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Sign Out Error:", error);
      throw error;
    }
  };

  const getIdToken = async (forceRefresh = true) => {
    try {
      if (!auth.currentUser) {
        console.log("No current user in Firebase");
        return null;
      }
      const token = await auth.currentUser.getIdToken(forceRefresh);
      // Update user object with new token
      setUser(prevUser => ({
        ...prevUser,
        currentToken: token
      }));
      return token;
    } catch (error) {
      console.error("Error getting ID token:", error);
      return null;
    }
  };

  const updateAuthUser = (newData) => {
    setUser(prevUser => {
      if (!prevUser) return newData;
      
      // Create new user object preserving Firebase methods
      const mergedUser = {
        ...prevUser,
        ...newData,
        // Ensure token is preserved
        currentToken: prevUser.currentToken
      };
      
      // Update localStorage
      localStorage.setItem("user", JSON.stringify({
        uid: mergedUser.uid,
        email: mergedUser.email,
        role: mergedUser.role,
        currentToken: mergedUser.currentToken
      }));
      
      return mergedUser;
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Always get a fresh token when auth state changes
          const token = await currentUser.getIdToken(true);
          const idTokenResult = await currentUser.getIdTokenResult();
          
          const userWithDetails = {
            ...currentUser,
            role: idTokenResult.claims.role,
            currentToken: token
          };
          
          setUser(userWithDetails);
          
          // Update localStorage with fresh data
          localStorage.setItem("user", JSON.stringify({
            uid: currentUser.uid,
            email: currentUser.email,
            role: idTokenResult.claims.role,
            currentToken: token
          }));
          
        } catch (error) {
          console.error("Error in auth state change:", error);
          setUser(null);
          localStorage.removeItem("user");
        }
      } else {
        console.log("No user found in auth state change");
        setUser(null);
        localStorage.removeItem("user");
      }
      setAuthUserLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authUserLoading && user) {
      if (user.role !== "Admin") {
        console.log("redirecting to admin login");
        router.push("/admin/login");
      } else {
        console.log("redirecting to admin dashboard");
        router.push("/admin");
      }
    }
  }, [user, router, authUserLoading]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      authUserLoading,
      updateAuthUser, 
      googleSignIn, 
      signOutFirebase, 
      getIdToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};