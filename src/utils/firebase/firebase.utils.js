import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';

import {
  getFirestore,
  doc, //Me da la instancia de un documento
  getDoc,
  setDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCi_19XpJCJxePn7mI2l0yBj1uQIsDgnQ",
  authDomain: "crwn-clothing-db-cb124.firebaseapp.com",
  projectId: "crwn-clothing-db-cb124",
  storageBucket: "crwn-clothing-db-cb124.appspot.com",
  messagingSenderId: "183083091011",
  appId: "1:183083091011:web:657a77c1e71831470440f6"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore()// con esta instancia creada ya puedo utilizarlo para acceder a mi base de datos.

//Esta funcion recibe la informacion del usuario autenticado y la guarda en firestore
//Se agrega additionalInformation para extender la funcionalidad de crear documento
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {

  if (!userAuth) return;

  //Aca basicamente lo que esto haciendo es pidiendo el documento dentro de la db en la collection users con este userAuth uid - Si el documento no existe igualmente me devuelve una referencia
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  // getDoc me da la informacion de un documento especifico. En este caso de userDocRef
  // El snapshot me sirve para verificar si existe o no un documento especifico en mi BD y ademas me permite acceder a los datos
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists())


  // No existe el usuario.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //Creo el documento
    try {
      await setDoc(userDocRef,
        {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        })
    }
    catch (error) {
      console.log('Ocurrio un error creando el usuario', error.message)
    }
    //Devuelvo la referencia del documento.
    return userDocRef
  }
  else {
    try {
      getDoc(userDocRef)
    }
    catch (error) {
      console.log('No se puedo recuperar el documento', error.message)
    }
    return userSnapshot
  }

}

export const createAuthUserWithEmail = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}
