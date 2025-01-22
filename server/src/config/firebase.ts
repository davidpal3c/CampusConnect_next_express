import admin from 'firebase-admin';

const serviceAccount = require('../../cc-dev-firebase-adminsdk.json');

export const initializeFirebaseAdmin = () => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
}




