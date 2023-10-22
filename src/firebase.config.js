import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpUE9Bb1AsOEWDoJnBsEZW9D7BIScBNc8",
  authDomain: "appaconselhei.firebaseapp.com",
  projectId: "appaconselhei",
  storageBucket: "appaconselhei.appspot.com",
  messagingSenderId: "534492449577",
  appId: "1:534492449577:web:c3530bcaeae0c3246ec538"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log(firebaseConfig);

/**
 * 
 * @param {*} uri
 * @param {*} name
 */

export const uploadToFirebase = async (uri, name, onProgress) => {
  const response = await fetch(uri);
  const theBlob = await response.blob();

  const imageRef = ref(getStorage(), `${user.uid}/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ 
          downloadUrl, 
          metadata: uploadTask.snapshot.metadata, 
        });

      }
    );

  })

}