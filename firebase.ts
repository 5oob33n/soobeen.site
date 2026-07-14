import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA2JPhUzdFQx4hrdl5AoGhMdGUX4YzKlfs",
  authDomain: "soobeen-portfolio.firebaseapp.com",
  databaseURL: "https://soobeen-portfolio-default-rtdb.firebaseio.com",
  projectId: "soobeen-portfolio",
  storageBucket: "soobeen-portfolio.firebasestorage.app",
  messagingSenderId: "794566091818",
  appId: "1:794566091818:web:7222d606ba7eacb7f94f53",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
