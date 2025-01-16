'use client';

import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, onIdTokenChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authUserLoading, setAuthUserLoading] = useState(true);
  const router = useRouter();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signOutFirebase = () => {
    return signOut(auth);
  };

  const getIdToken = async () => {
    if (!user) {
      // console.log("getIdToken called but user is not set yet.");
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

  const updateAuthUser = (newData) => { 
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   ...newData,
    // }));

    // Deep merge the new data with the existing user object to ensure we don't lose the Firebase user methods (e.g. getIdToken)
    setUser((prevUser) => {
      // if (!prevUser) return newData; // If no user yet, just set the new data
      if (!prevUser) return;

      // Ensure Firebase user methods are preserved
      const mergedUser = { ...prevUser, ...newData };
      Object.setPrototypeOf(mergedUser, Object.getPrototypeOf(prevUser));
      return mergedUser;
    });
  };
  
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //         setUser(currentUser);
  //     } else {
  //         setUser(null);
  //     }
  //     setAuthUserLoading(false);
  // });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {

        // Get the user's role from the ID token
        const idTokenResult = await currentUser.getIdTokenResult();
        const userWithRole = { ...currentUser, role: idTokenResult.claims.role };

        setUser(userWithRole);
        localStorage.setItem("user", JSON.stringify(currentUser));  // Store user in localStorage
      } else {
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
        router.push("/admin/login");
      } else {
        router.push("/admin");
      }
    }
  }, [user, router, authUserLoading]);

  // const checkSession = async () => {
  //   try {       

  //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/session`, {
  //           // method: "POST",
  //           // headers: { 
  //           //     "content-type": "application/json",
  //           //     "authorization": `Bearer ${token}`
  //           // },
  //           credentials: "include",                  
  //       });

  //       if (response.ok) {
  //           const userResponse = await response.json();
  //           updateAuthUser(userResponse.data);

  //       } else {
  //           const errorData = await response.text();
  //           console.log("Session check failed:", errorData);
  //       }
  //   } catch (error) {
  //     console.error("Error checking session:", error);
  
  //   }
  // }

  // useEffect(() => {
  // if (user) {
  //     console.log("USER: ", user);
  //     checkSession();
  // } 
  // }, []);


  return (
    <AuthContext.Provider value={{ user, authUserLoading ,updateAuthUser, googleSignIn, signOutFirebase, getIdToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};