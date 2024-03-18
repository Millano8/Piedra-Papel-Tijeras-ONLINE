import { state } from "../../state";

customElements.define("score-el",
    class extends HTMLElement{
        shadow: ShadowRoot;
        constructor(){
            super()
            this.shadow= this.attachShadow({mode:"open"})
        }
        connectedCallback(){
            const style = document.createElement("style")
            style.innerHTML = `
                .root{
                    width: 259px;
                    height: 217px;
                    border: solid #000000 10px;
                    border-radius: 10px;
                    background-color: #FFFFFF;
                    font-family: 'Odibee Sans', sans-serif;
                }
                .title{
                    font-size: 55px;
                    margin: 10px;
                }
                p{
                    font-size: 45px;
                    margin: 0;
                }
            `
            this.shadow.appendChild(style)
            this.render()
        }
        render(){
            const currentState = state.getState()
            const owner = currentState.users.owner
            const history = state.getHistory()
            let puntosJugador = ""
            let puntosJugador2 = ""
            if (owner == ""){
                puntosJugador = history[0].player2Points
                puntosJugador2 = history[0].player1Points
            } else {
                puntosJugador = history[0].player1Points
                puntosJugador2 = history[0].player2Points
            }
            let jugador = ""
            let jugador2 = ""
            if (owner == ""){
                jugador = currentState.users.player2
                jugador2 = currentState.users.player1
            } else {
                jugador = owner
                jugador2 = currentState.users.player2
            }

            const container = document.createElement("div")
            container.className = "root"
            container.innerHTML = `
                <h2 class="title">SCORE: </h2>
                <p class="player-uno">${jugador}: ${puntosJugador}</p>
                <p class="player-dos">${jugador2}: ${puntosJugador2}</p>
            `

            this.shadow.appendChild(container)
        }
})