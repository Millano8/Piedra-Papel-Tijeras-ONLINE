import { db, rtdb } from "./db";
const express = require('express')
const cors = require('cors')
import {v4 as uuidv4} from "uuid"
import * as dotenv from 'dotenv'
dotenv.config()



const PORT = 3000
const app = express()


app.use(express.json())
app.use(cors())

const roomsCollection = db.collection("rooms")

app.post("/rooms",(req,res)=>{
    const {nombre} = req.body
    if (nombre){    
        const roomRef = rtdb.ref("rooms/"+uuidv4())
        roomRef.set({
            currentGame: 
                {jugador1 : {
                    nombre: nombre,
                    choice: "",
                    start: "false"
                },
                jugador2: {
                    nombre:"",
                    choice: "",
                    start: "false"
                },
                owner: nombre
            },
             // crea en la rtdb una room con el longRoomId y setea el nombre del player1
        }).then(()=>{
            const longRoomId = roomRef.key
            const shortRoomId = 100000 + Math.floor(Math.random()*99999)
            roomsCollection.doc(shortRoomId.toString()).set({
                rtdbRoomId : longRoomId
            }).then(()=>{
                res.json({
                    id: shortRoomId // me devuelve el shortRoomId
                })
            })
        })
    } else {
        res.status(401).json({
            message: "no existis"
        })
    }
})

app.post("/rooms/start",(req,res)=>{
    const {rtdbId} = req.body

    const startP1 = rtdb.ref("rooms/"+rtdbId+"/currentGame/jugador1/start")
    const startP2 = rtdb.ref("rooms/"+rtdbId+"/currentGame/jugador2/start")
    startP1.set("false")
    startP2.set("false")
    const choiceP1 = rtdb.ref("rooms/"+rtdbId+"/currentGame/jugador1/choice")
    const choiceP2 = rtdb.ref("rooms/"+rtdbId+"/currentGame/jugador2/choice")
    choiceP1.set("")
    choiceP2.set("")
    res.json({message: "seteado a false"})
})

app.get("/rooms/:roomId",(req,res)=>{
    const {roomId} = req.params
    roomsCollection.doc(roomId).get().then(snap=>{
        const data = snap.data()
        const id = data.rtdbRoomId
        res.json({id: id})
    })
})

app.get("/rooms/:rtdbId/:nombre",(req,res)=>{
    const {rtdbId} = req.params
    const {nombre} = req.params
    const rtdbRef = rtdb.ref("rooms/"+rtdbId+"/currentGame/jugador2/nombre")
    rtdbRef.set(nombre)
})

app.get("/:rtdbId/:jugador",(req,res)=>{
    const {rtdbId} = req.params
    const {jugador} = req.params
    const rtdbRef = rtdb.ref("rooms/"+rtdbId+"/currentGame/"+jugador+"/start")
    rtdbRef.set("true")
    res.json({flag:"true"})
})

app.get("/jugada/:rtdbId/:jugador/:jugada",(req,res)=>{
    const {rtdbId} = req.params
    const {jugador} = req.params
    const {jugada} = req.params
    const rtdbRef = rtdb.ref("rooms/"+rtdbId+"/currentGame/"+jugador+"/choice")
    rtdbRef.set(jugada)
    res.json({message: "Todo ok loco"})
})

app.listen(PORT,()=>{
    console.log("Server running on http://localhost:",PORT)
})
