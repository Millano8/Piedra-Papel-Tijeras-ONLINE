import { state } from "../../state"


export function initInicioSalaCodigo(params){
        const div = document.createElement("div")
        state.restartGame()
        const currentState = state.getState()
        const nombrePlayer1 = currentState.users.player1
        const nombrePlayer2 = currentState.users.player2
        const history = currentState.history
        const codigoSala = currentState.codigoSala.shortCode
        
        div.className = "init-page-salaCodigo"
        div.innerHTML = `
            <div>
                <div class="init-page-salaCodigo__score">
                    <div class="init-page-salaCodigo__players">
                        <h4>${nombrePlayer1 || "player 1"}</h4>
                    </div>
                    <div class="init-page-salaCodigo__sala">
                        <h4>Sala</h4>
                        <h4>${codigoSala || "codigo sala"}</h4>
                    </div>
                </div>
            </div>
            <div class="init-page-salaCodigo__comparti">
                <h3>Compartí el código: </h3>
                <h2 id="codigo-sala">${codigoSala || "aca va el codigo"}</h2>
                <h3>con tu contrincante</h3>
            </div>
            <div class="init-page-salaCodigo__hands">
                <hands-el></hands-el>
            </div>
        `

        function goInstructions(){params.goTo("/instructions")}

        
        state.listenRoom(goInstructions)

        return div
}
