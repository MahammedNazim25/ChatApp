import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgkC6XKdeU-oZpOKDaf11WenyXvYS5sCo",
  authDomain: "chatwith-dfa18.firebaseapp.com",
  projectId: "chatwith-dfa18",
  storageBucket: "chatwith-dfa18.appspot.com",
  messagingSenderId: "438857629581",
  appId: "1:438857629581:web:13ac20d3d67430e64047c4",
  measurementId: "G-JEFN792MK3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {auth,db};

