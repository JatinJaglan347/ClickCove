import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {useFirebase} from '../../context/Firebase'
import Login from '../Login/Login';
import { get,getDatabase ,ref } from 'firebase/database';
import { Navbar } from '../Navbar/Navbar';



const auth = getAuth();
function Home() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                // Fetch user data from Realtime Database based on UID
                getData(user.uid);
            } else {
                setUser(null);
            }
        });
    }, []);

    // const getData = async (uid) => {
    //     const db = getDatabase();
    //     const userRef = ref(db, `users/${uid}`);
    //     onValue(userRef, (snapshot) => {
    //         const data = snapshot.val();
    //         setUserData(data);
    //     });
    // };

    const getData = async (uid) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${uid}`);
    
        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setUserData(data);
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error getting user data:', error);
        }
    };
    


    

    if (user === null) {
        return <Login />;
    }

    return (
        <>
            <Navbar/>
            Home
            {/* <h1>Hello {userData ? userData.name : 'User'}</h1>
            <h2>Email: {user.email}</h2>
            <button
                type="button"
                onClick={() => signOut(auth)}
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
                Logout
            </button> */}
        </>
    );
}

export default Home;
