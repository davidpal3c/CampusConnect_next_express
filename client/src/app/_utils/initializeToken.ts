import { getAuth } from "firebase/auth";

const auth = getAuth();

const initializeToken = async () => {

  const storedToken = localStorage.getItem('authToken');                // check if token exists in localStorage (or cookies)

  if (storedToken) {
    try {
      const user = auth.currentUser;                                    // get the current user from Firebase
      if (user) {
        const refreshedToken = await user.getIdToken(true);             // Force refresh
        localStorage.setItem('authToken', refreshedToken);              // store token

        console.log("Token is valid and refreshed");
      } 
    } catch (error) {
      console.error("Error refreshing token:", error);
      // (redirect to login page if needed)
    }
  } else {
    console.log("No token found, user is not authenticated");
    // redirect or perform actions based on token absence
  }
};

export default initializeToken();
