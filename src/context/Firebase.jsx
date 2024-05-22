import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

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

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signupWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(database, key), data);

  const addToCart = async (uid, productId, quantity) => {
    try {
      const cartRef = ref(database, `users/${uid}/cart/${productId}`);
      await set(cartRef, { productId, quantity });
      return { success: true, message: "Product added to cart successfully" };
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      return { success: false, message: error.message };
    }
  };

  const handleSignUp = async (name, email, password) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(firebaseAuth, email);
      if (signInMethods && signInMethods.length > 0) {
        return { success: false, message: "Email is already in use" };
      }

      const userCredential = await signupWithEmailAndPassword(email, password);
      const { uid } = userCredential.user;
      await putData("users/" + uid, { name, email, password });
      return { success: true, message: "User created successfully" };
    } catch (error) {
      console.error("Error creating user:", error.message);
      return { success: false, message: error.message };
    }
  };

  return (
    <FirebaseContext.Provider 
      value={{ signupWithEmailAndPassword, signinWithEmailAndPassword, putData, handleSignUp, addToCart, currentUser }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
