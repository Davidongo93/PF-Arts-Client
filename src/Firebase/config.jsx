import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAyi6kuw4OLNYF5CXQnLSpdC66SLH_MRp4',
  authDomain: 'henry-art-gallery-cc400.firebaseapp.com',
  projectId: 'henry-art-gallery-cc400',
  storageBucket: 'henry-art-gallery-cc400.appspot.com',
  messagingSenderId: '856286213785',
  appId: '1:856286213785:web:b1cf32264a6103f5666a08',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
