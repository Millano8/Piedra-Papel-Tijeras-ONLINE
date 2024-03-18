import { state } from "../../state"

export function initInstructions(params){

    const div = document.createElement("div")
    const currentState = state.getState()
    const nombrePlayer1 = currentState.users.player1
    const nombrePlayer2 = currentState.users.player2
    const history = state.getHistory()
    const codigoSala = currentState.codigoSala.shortCode

    div.className = "init-instructions"
    div.innerHTML = `
        <div>
            <div class="init-page-instructions__score">
                <div class="init-page-instructions__players">
                    <h4>${nombrePlayer1 || "player 1"}: ${history[0].player1Points || "0"}</h4>
                    <h4 id="player2-instructions">${nombrePlayer2 || "player 2"}: ${history[0].player2Points || "0"}</h4>
                </div>
                <div class="init-page-instructions__sala">
                    <h4>Sala</h4>
                    <h4>${codigoSala || "codigo sala"}</h4>
                </div>
            </div>
            <div class="init-instructions__title">
                <h2>Presioná jugar y elegi: piedra, papel o tijeras antes de que pasen 5 segundos</h2>
            </div>
            <div class="init-instructions__button">
                <jugar-buttom>Jugar!</jugar-buttom>
            </div>
            <div class="init-instructions__reset-button">
                <reset-button>Reset Score</reset-button>
            </div>
            <div class="init-instructions__hands">
                <hands-el></hands-el>
            </div>   
        </div>
    `
    function goToSalaEspera(){
        params.goTo("/sala-espera")
    }

    const button = div.querySelector(".init-instructions__button")
    button?.addEventListener("click",()=>{
        state.pushStart(()=>{
            goToSalaEspera()
        })
    })
    const reset = div.querySelector(".init-instructions__reset-button")
    reset?.addEventListener("click",()=>{
        state.restartGame()
    })
    return div
}