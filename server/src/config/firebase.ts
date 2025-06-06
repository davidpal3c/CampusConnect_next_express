import admin from 'firebase-admin';

// const serviceAccount = require('../../cc-dev-firebase-adminsdk.json');
const serviceAccount: any = {
    type: process.env.FIREBASE_SDK_TYPE,
    project_id: process.env.FIREBASE_SDK_PROJECT_ID,
    private_key_id: process.env.FIREBASE_SDK_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_SDK_PRIVATE_KEY,
    client_email: process.env.FIREBASE_SDK_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_SDK_CLIENT_ID,
    auth_uri: process.env.FIREBASE_SDK_AUTH_URI,
    token_uri: process.env.FIREBASE_SDK_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_SDK_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_SDK_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_SDK_UNIVERSE_DOMAIN
}
  

export const initializeFirebaseAdmin = () => {
    try {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }
    } catch (error) {
        console.error('Firebase initialization error', error);
        throw error;
    }
}

export const getAuth = () => {
    return admin.auth();
}