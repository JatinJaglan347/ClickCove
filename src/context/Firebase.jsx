import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {getAuth , createUserWithEmailAndPassword, fetchSignInMethodsForEmail , signInWithEmailAndPassword} from 'firebase/auth'
import {getDatabase, set , ref ,push ,get} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAmWXE9_OCaEkcUEUx6MbbAc908UZBZ_LA",
    authDomain: "clickcove-fee.firebaseapp.com",
    databaseURL: "https://clickcove-fee-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "clickcove-fee",
    storageBucket: "clickcove-fee.appspot.com",
    messagingSenderId: "826962659655",
    appId: "1:826962659655:web:880fb3227b6e9b44f9e462",
    measurementId: "G-9B7X3YFP6E"
  };

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const database = getDatabase(firebaseApp)
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);



export const FirebaseProvider =(props) =>{

    const signupWithEmailAndPassword =(email ,password) => {
       return createUserWithEmailAndPassword(firebaseAuth ,email , password)
    }
    const signinWithEmailAndPassword =(email , password) =>{
        return signInWithEmailAndPassword(firebaseAuth , email , password)
    }

    const putData = (key, data) => set(ref(database, key), data);

// Inside your firebase context file
const handleSignUp = async (name, email, password) => {
    try {
      // Check if the email is already taken
      const signInMethods = await fetchSignInMethodsForEmail(firebaseAuth, email);
      if (signInMethods && signInMethods.length > 0) {
        // Email already exists, return an error message
        return { success: false, message: "Email is already in use" };
      }
  
      // Email is available, proceed with signup
      const userCredential = await signupWithEmailAndPassword(email, password);
      const { uid } = userCredential.user; // Get the UID of the newly created user
      await putData("users/" + uid, { name, email, password }); // Store user data with UID as the key
      return { success: true, message: "User created successfully" };
    } catch (error) {
      console.error("Error creating user:", error.message);
      return { success: false, message: error.message };
    }
  };
  

  
    

    return(
        <FirebaseContext.Provider 
            value={{signupWithEmailAndPassword,signinWithEmailAndPassword, putData,handleSignUp }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}
