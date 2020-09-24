import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDH8y7tTctQ5sJrpZQmh5ccCa4TpNnMza8',
  authDomain: 'crwn-db-16f4a.firebaseapp.com',
  databaseURL: 'https://crwn-db-16f4a.firebaseio.com',
  projectId: 'crwn-db-16f4a',
  storageBucket: 'crwn-db-16f4a.appspot.com',
  messagingSenderId: '369605174594',
  appId: '1:369605174594:web:9daa828834b4b1e16914db',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
