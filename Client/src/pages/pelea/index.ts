import {state} from "../../state"

export function initPelea(params){
    const currentState = state.getState()
    const owner = currentState.users.owner
    let jugadaJugador = ""
    if (owner == ""){
        jugadaJugador = currentState.currentGame.player2Play 
    }   else {
        jugadaJugador = currentState.currentGame.player1Play
    }


    const div = document.createElement("div")
    div.className = "init-pelea"

    const imgPapel = new URL("../../components/images/Papel.png", import.meta.url) as any
    const imgPiedra = new URL("../../components/images/Piedra.png", import.meta.url) as any
    const imgTijera = new URL("../../components/images/Tijera.png", import.meta.url) as any
    const imgExplosion = new URL("../../components/images/img-explosion1.jpg", import.meta.url) as any



    if (jugadaJugador == "tijeras"){
        div.innerHTML = `
            <div class="init-pelea">
                <div class="init-pelea__rotada">
                    <other-play></other-play>
                </div>
                <div class="init-pelea__explosion">
                    <img src="${imgExplosion}" class="init-pelea__explosionImg"/>
                </div>
                <div class="init-pelea__myPlay">
                    <img src="${imgTijera}" class="init-pelea__img"/>
                </div>
            </div>
            
        `
    }  else if (jugadaJugador == "papel"){
        div.innerHTML = `
            <div class="init-pelea">
                <div class="init-pelea__rotada">
                    <other-play></other-play>
                </div>
                <div class="init-pelea__explosion">
                    <img src="${imgExplosion}" class="init-pelea__explosionImg"/>
                </div>
                <div class="init-pelea__myPlay">
                    <img src="${imgPapel}" class="init-pelea__img"/>
                </div>
            </div>
        `
    } else if (jugadaJugador == "piedra"){
        div.innerHTML = `
            <div class="init-pelea">
                <div class="init-pelea__rotada">
                    <other-play></other-play>
                </div>
                <div class="init-pelea__explosion">
                    <img src="${imgExplosion}" class="init-pelea__explosionImg"/>
                </div>
                <div class="init-pelea__myPlay">
                    <img src="${imgPiedra}" class="init-pelea__img"/>
                </div>
            </div>
            `
    }

    let ganador = ""
    if (owner ==""){
        ganador = state.whoWins(
            currentState.currentGame.player2Play,
            currentState.currentGame.player1Play
        );
    }   else {
        ganador = state.whoWins(
            currentState.currentGame.player1Play,
            currentState.currentGame.player2Play
        )
    }

    

    const resultado = currentState.currentGame.resultado
    state.countPoints(resultado)
    const history = state.getHistory()

    state.stopListening()
    
    setTimeout(()=>{
        if (resultado == "ganaste"){
             params.goTo("/resultadoGanaste")
        } else if (resultado == "perdiste"){
            params.goTo("/resultadoPerdiste")
        } else {
            state.setStart().then(()=>{
                state.restartState()
                state.stopListening()
                params.goTo("/juego")
            })

        }
    },3000) // aca van 3000ms 

    return div
}

