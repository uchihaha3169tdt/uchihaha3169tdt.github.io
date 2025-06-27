/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAYxQMCrDUobAL6xIWl0HOsr_Epy498YXU',
	authDomain: 'bus-ticket-booking-syste-82d89.firebaseapp.com',
	projectId: 'bus-ticket-booking-syste-82d89',
	storageBucket: 'bus-ticket-booking-syste-82d89.appspot.com',
	messagingSenderId: '34386350003',
	appId: '1:34386350003:web:4bd1b7ce38f6bc9b88c5c6',
	measurementId: 'G-8MZQVQKBG0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);