import * as firebase from "firebase-admin"
import * as serviceAccount from "./../keys.json"

firebase.initializeApp({
    credential : firebase.credential.cert(serviceAccount as any),
    databaseURL:"https://ppt-online-d143e-default-rtdb.firebaseio.com"
})

const db = firebase.firestore()
const rtdb = firebase.database()


export {db, rtdb}