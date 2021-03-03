
import firebase from 'firebase';
import * as firebaseui from 'firebaseui'

const firebaseConfig = {
    apiKey: "AIzaSyDmFILONzB-PRsAyqfjiOC_UBmIqgfU57I",
    authDomain: "mytaurus-5c3a3.firebaseapp.com",
    projectId: "mytaurus-5c3a3",
    storageBucket: "mytaurus-5c3a3.appspot.com",
    messagingSenderId: "1028560977584",
    appId: "1:1028560977584:web:46113b7f6fc9e8a1590575",
    measurementId: "G-J8JT3YVB43"
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const authUI = new firebaseui.auth.AuthUI(auth);