import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAblJaWymBlkalptp9OeRKvOFQOynFGcG4",
    authDomain: "realtime-chat-app-5d7c1.firebaseapp.com",
    projectId: "realtime-chat-app-5d7c1",
    storageBucket: "realtime-chat-app-5d7c1.appspot.com",
    messagingSenderId: "840234865656",
    appId: "1:840234865656:web:b496a14442feff881bbc0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL }