import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBhE50bnPSVqG7a4UQAAHAJ25Cke8GFrHc",
  authDomain: "cgp-job-portal.firebaseapp.com",
  projectId: "cgp-job-portal",
  storageBucket: "cgp-job-portal.appspot.com",
  messagingSenderId: "1098980632524",
  appId: "1:1098980632524:web:147c5d512c442f33de1f69",
  measurementId: "G-264RLKS39H"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
