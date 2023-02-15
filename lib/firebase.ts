import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY || 'test',
    
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || 'test',
    
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID || 'test',
  
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'test',
  
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || 'test',
  
    appId: process.env.NEXT_PUBLIC_APP_ID || 'test'
  
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);