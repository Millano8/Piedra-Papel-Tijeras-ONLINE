import firebase from "firebase"

const app = firebase.initializeApp({
    apiKey: "QXiiBJ2UCXL7dGrOlZkUtoj1lJ5CvMpB3MElS4jP",
    databaseURL:"https://ppt-online-d143e-default-rtdb.firebaseio.com",
    projectId: "ppt-online-d143e",
    authDomain: "ppt-online-d143e.firebaseapp.com"
})

const rtdb = firebase.database()




export {rtdb}