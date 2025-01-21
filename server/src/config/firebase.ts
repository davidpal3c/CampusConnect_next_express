import admin from 'firebase-admin';

const serviceAccount = require('../../cc-dev-firebase-adminsdk.json');

export const initializeFirebaseAdmin = () => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
}

export const verifyIdToken = async (idToken: string) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);     
        console.log("DECODED TOKEN: ", decodedToken);
        return decodedToken;
    } catch (error) {
        throw new Error("Invalid Token");
    }   
};


