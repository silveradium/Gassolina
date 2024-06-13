import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsszyT5b6BImv3M4G_oNB9O1lTJ-RD2Dg",
  authDomain: "gassolina-39843.firebaseapp.com",
  projectId: "gassolina-39843",
  storageBucket: "gassolina-39843.appspot.com",
  messagingSenderId: "403466024628",
  appId: "1:403466024628:web:45126f315cf5dd9662c9e1"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



export const auth = getAuth(app);


let startDate = new Date();
//unnecessary function
let Name = "user 4";
let data = {
     weight: 80,
     date: new Date(1716842649711)
     
 };
async function createCollectionAndAddData(db, collectionName, data) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

let futureDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
//console.log(futureDate);

console.log(new Date(1716834671871));
console.log(new Date(1716842344564));
//console.log(new Date().getTime() - ("2024-05-27T21:01:58.409005Z"));
console.log(new Date());

//console.log(new Date().getTime())
//console.log(new Date(1716835707739))
// setInterval(() => {
//   if (data.weight < 0) {
//       clearInterval();
//       data.weight = 80;
//   }
//   else  {
//       data.weight -= 0.6;
//       data.weight = Math.round(data.weight * 10) / 10;
//       console.log(data.weight);
//       minutesDifference = (new Date() - startDate) / 60000;
//       console.log(minutesDifference);
//       createCollectionAndAddData(db, Name, data);
//   }
// }, 10000);