// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAegyuMw91mknbcvspMc1LGzAPo3_0bm04",
    authDomain: "hirex-app-ptit.firebaseapp.com",
    projectId: "hirex-app-ptit",
    storageBucket: "hirex-app-ptit.appspot.com",
    messagingSenderId: "584242540951",
    appId: "1:584242540951:web:0705e53ceb88921f9e94d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const db = getFirestore(app);
export const storage = getStorage(app);