import { state } from "../../state"

export function salaEspera(params){

    const div = document.createElement("div")
    const currentState = state.getState()
    const nombrePlayer1 = currentState.users.player1
    const nombrePlayer2 = currentState.users.player2
    const history = currentState.history
    const codigoSala = currentState.codigoSala.shortCode
    let nombreEspera = ""
    if (currentState.users.owner == ""){
        nombreEspera == nombrePlayer2
    }   else{
        nombreEspera == nombrePlayer1
    }

    div.className = "init-salaEspera"
    div.innerHTML = `
        <div>
            <div class="init-salaEspeera__score">
                <div class="init-salaEspera__players">
                    <h4>${nombrePlayer1 || "player 1"}: ${history.player1Points || "0"}</h4>
                    <h4 id="player2-salaEspera">${nombrePlayer2 || "player 2"}: ${history.player2Points || "0"}</h4>
                </div>
                <div class="init-salaEspera__sala">
                    <h4>Sala</h4>
                    <h4>${codigoSala || "codigo sala"}</h4>
                </div>
            </div>
            <div class="init-salaEspera__title">
                <h2>Esperando a que ${nombreEspera} apriete jugar</h2>
            </div>
            <div class="init-salaEspera__hands">
                <hands-el></hands-el>
            </div>   
        </div>
    `
    
    state.listenStart(()=>{
        params.goTo("/juego")
    })

    return div
}