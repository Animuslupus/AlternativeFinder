import firebase from 'firebase';

const appConfig = {
    devApiIp: "http://127.0.0.1:4000",
    productionApiIp: "alternatives.climateers.app",
    isDev: false 
}

const firebaseConfig = {
    apiKey: "AIzaSyBbBgftjIRw97QbxUSDXDUkeVTJtrP4uQA",
    authDomain: "climateers-429ca.firebaseapp.com",
    projectId: "climateers-429ca",
    storageBucket: "climateers-429ca.appspot.com",
    messagingSenderId: "969502030102",
    appId: "1:969502030102:web:7c30c30c43ea7a3cc8f837",
    measurementId: "G-KMHHWHR8N8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const eventDB = firebase.firestore();

export { appConfig, firebase, eventDB };