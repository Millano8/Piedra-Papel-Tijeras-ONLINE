
import { state } from "../../state";
let jugada = ""


export function initJuego(params){
    const div = document.createElement("div")
    div.className = "init-juego"
    const imgPapel = new URL("../../components/images/Papel.png", import.meta.url) as any
    const imgPiedra = new URL("../../components/images/Piedra.png", import.meta.url) as any
    const imgTijera = new URL("../../components/images/Tijera.png", import.meta.url) as any

    div.innerHTML = `
        <div class="pagina-juego">
            <div class="init-juego__rotadas">
                <div>
                    <img src="${imgPapel}"/>
                </div>
                <div>
                <img src="${imgPiedra}"/>
                </div>
                <div>
                    <img src="${imgTijera}"/>
                </div>
            </div>
            <div class="count-down">
                <count-down></count-down>
            </div>
            <div class="init-juego__hands">
                <div>
                    <img src="${imgPapel}" class="papel"/>
                </div>
                <div>
                    <img src="${imgPiedra}" class="piedra"/>
                </div>
                <div>
                    <img src="${imgTijera}"/ class="tijeras">
                </div>
            </div>
        </div>
    `
    
    
    const elegiPapel = div.querySelector(".papel")
    const elegiPiedra = div.querySelector(".piedra")
    const elegiTijeras = div.querySelector(".tijeras")

    function goToPelea(){
        setTimeout(()=>{
            params.goTo("/pelea")
        },1000)

    }


    elegiPapel?.addEventListener("click",()=>{
        clearTimeout(timeOutReturn);
        jugada = "papel"
        const currentState = state.getState()
        const owner = currentState.users.owner
        if (owner == ""){
            currentState.currentGame.player2Play = jugada
            state.setState(currentState)
            state.setChoice()?.then(()=>{
                state.getChoice(goToPelea)
            })
        } else {
            currentState.currentGame.player1Play = jugada
            state.setState(currentState)
            state.setChoice()?.then(()=>{
                state.getChoice(goToPelea)
            })
        }
    })

    elegiPiedra?.addEventListener("click",()=>{
        clearTimeout(timeOutReturn)
        jugada = "piedra"
        const currentState = state.getState()
        const owner = currentState.users.owner
        if (owner == ""){
            currentState.currentGame.player2Play = jugada
            state.setState(currentState)
            state.setChoice()?.then(()=>{
                state.getChoice(goToPelea)
            })
        } else {
            currentState.currentGame.player1Play = jugada
            state.setState(currentState)
            state.setChoice()?.then(()=>{
                state.getChoice(goToPelea)
            })
        }
        
    })

    elegiTijeras?.addEventListener("click",()=>{
        clearTimeout(timeOutReturn)
        jugada = "tijeras"
        const currentState = state.getState()
        const owner = currentState.users.owner
        if (owner == ""){
            currentState.currentGame.player2Play = jugada
            state.setState(currentState)
            state.setChoice()?.then(()=>{
                state.getChoice(goToPelea)
            })
        } else {
            currentState.currentGame.player1Play = jugada
            state.setState(currentState)
            state.setChoice()?.then(()=>{
                state.getChoice(goToPelea)
            })
        }
    })

    const timeOutReturn = setTimeout(()=>{
       // params.goTo("/inicio")
    },15000)

    return div
}
