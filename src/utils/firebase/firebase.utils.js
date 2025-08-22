import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4ommXB_1K_pl_9nWyHijXKr93poJKqlI",
  authDomain: "apparel-avenue-db.firebaseapp.com",
  projectId: "apparel-avenue-db",
  storageBucket: "apparel-avenue-db.firebasestorage.app",
  messagingSenderId: "811709050682",
  appId: "1:811709050682:web:75408b7d8c13a167ca2a03",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

// Allways need to have an account selected
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(
        "createUserDocumentFromAuthThere: There was an error ",
        error.message
      );
    }
  }
  return userDocRef;
};
