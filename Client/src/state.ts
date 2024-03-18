import { rtdb } from "./rtdb";
type Jugada = "piedra" | "papel" | "tijeras";

const API_BASE_URL = "http://localhost:3000"

type Game = {
    computerPlay: Jugada,
    myPlay: Jugada,
}

const state = {
    data: {
        codigoSala:{
            shortCode:"",
            rtdbCode: ""
        },
        users:{
            player1: "",
            player2: "",
            owner: ""
        },
        currentGame:{
            player1Play: "",
            player2Play: "",
            resultado: ""
        },
        history : [
            {
                player1Points : 0,
                player2Points : 0
        }]
    },
    listeners: [],
    getState(){
        return this.data
    },
    setState(newState){
        this.data = newState;
        for (const callback of this.listeners){
            callback();
        }
    },
    subscribe(callback: (any)=>any){
        this.listeners.push(callback)
    },
    setName(fullName: string){
        const currentState = this.getState()
        currentState.users.player1 = fullName
        currentState.users.owner = fullName
        this.setState(currentState) 
    },
    setName2(fullname: string){
        const currentState = this.getState()
        currentState.users.player2 = fullname
        this.setState(currentState)
    },
    signIn(){
        const currentState = this.getState()
        if (currentState.users.player1){
            return fetch(API_BASE_URL+"/rooms",{
                method: "post",
                headers:{
                    "content-type": "application/json"
                },
                body: JSON.stringify({nombre: currentState.users.player1})
            }).then((res)=>{
                return res.json()
            }).then(data=>{
                currentState.codigoSala.shortCode = data.id
                this.setState(currentState)
            })
        } else{
            console.error("No hay Jugadores en el State")
        }
    },
    accessToRoom(){
        const currentState = this.getState()
        const player2 = currentState.users.player2
        const roomId = currentState.codigoSala.shortCode
        if (roomId){
            return fetch(API_BASE_URL+"/rooms/"+ roomId).then((res)=>{
                return res.json()
            }).then((rtdbRoomId)=>{    
                currentState.codigoSala.rtdbCode = rtdbRoomId.id
                this.setState(currentState)      
            }).then(()=>{
                const rtdbRoomId = currentState.codigoSala.rtdbCode
                fetch(API_BASE_URL+"/rooms/"+rtdbRoomId+"/"+player2)
            })
        }
    },
    accesToRoom2(){
        const currentState = this.getState()
        const roomId = currentState.codigoSala.shortCode
        if (roomId){
            return fetch(API_BASE_URL+"/rooms/"+ roomId).then((res)=>{
                return res.json()
            }).then((rtdbRoomId)=>{    
                currentState.codigoSala.rtdbCode = rtdbRoomId.id
                this.setState(currentState)
            })
        }
    },
    printingRtdbData(){
        const currentState = this.getState()
        const roomId = currentState.codigoSala.rtdbCode
        const player2 = currentState.users.player2
        const gameroomsRef = rtdb.ref("/rooms/"+roomId)
        return gameroomsRef.once("value",((snapshot)=>{
            const value = snapshot.val()
            const player1 = value.currentGame.jugador1.nombre
            currentState.users.player1 = player1
            this.setState(currentState)
        }))
    },
    listenRoom(callback){
        const currentState = this.getState()
        const rtdbId = currentState.codigoSala.rtdbCode
        const gameroomsRef = rtdb.ref("/rooms/"+rtdbId)
                gameroomsRef.on("value",(snapshot)=>{
                    const value = snapshot.val()
                    const player2 = value.currentGame.jugador2.nombre
                    if (player2 != ""){
                        currentState.users.player2 = player2
                        this.setState(currentState)
                        callback()
                       }
                })
    },
    pushStart(callback){
        const currentState = this.getState()
        const rtdbId = currentState.codigoSala.rtdbCode
        const owner = currentState.users.owner
        if (owner == ""){
            fetch(API_BASE_URL+"/"+rtdbId+"/jugador2").then(()=>{
                callback()
            })
        } else {
            fetch(API_BASE_URL+"/"+rtdbId+"/jugador1").then(()=>{
                callback()
            })
        }
    },
    listenStart(callback){
        const currentState = this.getState()
        const rtdbId = currentState.codigoSala.rtdbCode
        const owner = currentState.users.owner
        const gameroomsRef = rtdb.ref("/rooms/"+rtdbId)
        gameroomsRef.on("value",(snappshot)=>{
            const value = snappshot.val()
            const start1 = value.currentGame.jugador1.start
            const start2 = value.currentGame.jugador2.start
            if (start1 == "true" && start2 == "true"){
                callback()
            }
        }) 
    },
    stopListening(){
        const currentState = this.getState()
        const rtdbId = currentState.codigoSala.rtdbCode
        const gameroomsRef = rtdb.ref("/rooms/"+rtdbId)
        gameroomsRef.off("value")
    },
    setChoice(){
        const currentState = this.getState()
        const rtdbId = currentState.codigoSala.rtdbCode
        const owner = currentState.users.owner
        const choice1 = currentState.currentGame.player1Play
        const choice2 = currentState.currentGame.player2Play
        if (owner == ""){
            return fetch(API_BASE_URL+"/jugada/"+rtdbId+"/jugador2/"+choice2)
        } else {
            return fetch(API_BASE_URL+"/jugada/"+rtdbId+"/jugador1/"+choice1)
        }

    },
    getChoice(callback){
        const currentState = this.getState()
        const rtdbId = currentState.codigoSala.rtdbCode
        const owner = currentState.owner
        const gameroomsRef = rtdb.ref("/rooms/"+rtdbId)
        gameroomsRef.on("value",(snappshot)=>{
            const value = snappshot.val()
            const choice1 = value.currentGame.jugador1.choice
            const choice2 = value.currentGame.jugador2.choice
            if (owner == ""){
                currentState.currentGame.player1Play = choice1
                currentState.currentGame.player2Play = choice2
                this.setState(currentState)
                if (choice1 != "" && choice2 != ""){
                    if (currentState.currentGame.player1Play != ""){
                        callback()
                    }
                }
            }  else {
                currentState.currentGame.player1Play = choice1
                currentState.currentGame.player2Play = choice2
                this.setState(currentState)
                if (choice1 != "" && choice2 != ""){
                    if (currentState.currentGame.player2Play != ""){
                        callback()                        
                    }
                }
            }
            
        })
    },
    setStart(){
        const currentState = this.getState()
        
        return fetch(API_BASE_URL+"/rooms/start",{
            method: "post",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({rtdbId: currentState.codigoSala.rtdbCode})
        })
    },
    restartState(){
        const currentState = this.getState()
        currentState.currentGame.player1Play = ""
        currentState.currentGame.player2Play = ""
        currentState.currentGame.resultado = ""
        state.setState(currentState)
    },
    pushToHistory(play:Game){
        const currentState = this.getState()
        currentState.history.push(play)
    },
    getHistory(){
        const currentState = this.getState()

        const history = localStorage.getItem("history")
        if (history) {
            const parsedHistory = JSON.parse(history)
            state.data.history = parsedHistory
        }
        return currentState.history
    },
    whoWins(player1Play:Jugada,player2play:Jugada){
        const currentState = this.getState()
        let ganador = ""

        if (player1Play == "tijeras" && player2play == "papel") {
            ganador = "ganaste"
        } else if (player1Play == "papel" && player2play == "piedra"){
            ganador = "ganaste"
        } else if (player1Play == "piedra" && player2play == "tijeras"){
            ganador = "ganaste"
        } else if (player1Play == player2play) {
            ganador = "empate"
        } else {
            ganador = "perdiste"
        }

        currentState.currentGame.resultado = ganador
        this.setState(currentState)
        return ganador
    },
    countPoints(resultado){
        const currentState = this.getState()
        const history = this.getHistory()
        const owner = currentState.users.owner

        if (resultado == "ganaste"){
            if (owner == ""){
                history[currentState.history.length -1].player2Points++
            } else {
                history[currentState.history.length -1].player1Points++
            }
            
        } else if (resultado == "perdiste"){
            if (owner == "") {
                history[currentState.history.length -1].player1Points++
            } else {
                history[currentState.history.length -1].player2Points++
            }
            
        }

        localStorage.setItem("history", JSON.stringify(currentState.history))
        this.setState(currentState)
    },
    restartGame(){
        const currentState = this.getState()
        const history = this.getHistory()
        
        history[currentState.history.length -1].player1Points = 0
        history[currentState.history.length -1].player2Points = 0

        localStorage.setItem("history", JSON.stringify(currentState.history))
    }
}

export {state}