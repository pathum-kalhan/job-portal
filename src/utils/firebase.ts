import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC9sHO3ocbabpXZ32wbUjgdSxUlwHpZVS8',
  authDomain: 'tj-admin-dev.firebaseapp.com',
  projectId: 'tj-admin-dev',
  storageBucket: 'tj-admin-dev.appspot.com',
  messagingSenderId: '654665534789',
  appId: '1:654665534789:web:307d3d030a9f675bb8822c',
  measurementId: 'G-HFGVMGQ692',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
