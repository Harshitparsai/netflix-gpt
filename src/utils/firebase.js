// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCqomZCUzPXS2els8mYxCcKbBRnaT_b99o',
  authDomain: 'netflixgpt-b7e4a.firebaseapp.com',
  projectId: 'netflixgpt-b7e4a',
  storageBucket: 'netflixgpt-b7e4a.appspot.com',
  messagingSenderId: '509804473994',
  appId: '1:509804473994:web:4774b57f17d8429da28773',
  measurementId: 'G-BFLNPV0CHT',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth()
