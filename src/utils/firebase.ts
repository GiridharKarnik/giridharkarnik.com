// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported, Analytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDZPn7nrTXB8nuUGxSv_k6ZWjBIizY_ChQ',
  authDomain: 'giridharkarnik-portfolio.firebaseapp.com',
  projectId: 'giridharkarnik-portfolio',
  storageBucket: 'giridharkarnik-portfolio.appspot.com',
  messagingSenderId: '487425958555',
  appId: '1:487425958555:web:f21f6f312c5e0879a55c3e',
  measurementId: 'G-5BXWLSNQMM',
};

let firebase, analytics: Analytics;

isSupported().then(() => {
  firebase = initializeApp(firebaseConfig);

  analytics = getAnalytics(firebase);
});

export { analytics, logEvent };
