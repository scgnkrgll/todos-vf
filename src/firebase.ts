import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCsNI9SF2sGDy1VTfucDEetAxyTw1rcSCE",
  authDomain: "todos-vf.firebaseapp.com",
  projectId: "todos-vf",
  storageBucket: "todos-vf.appspot.com",
  messagingSenderId: "724388112823",
  appId: "1:724388112823:web:6bef5d8cdc38cd3f0fe032",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db
