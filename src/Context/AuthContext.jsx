import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const UserContext = createContext();


const AuthContext = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [emailUser, setEmailUser] = useState('');

    const signup = (email, password) => {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    resolve(userCredential.user);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const logout = () => signOut(auth);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    resolve(userCredential.user)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, signup, login, logout, loading, emailUser, setEmailUser }}>
            {children}
        </UserContext.Provider>)
}

export default AuthContext;