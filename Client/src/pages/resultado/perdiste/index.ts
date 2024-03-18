import { state } from "../../../state"

export function initPerdiste(params){
    const div = document.createElement("div")
    const currentState = state.getState()
    div.className = "res-perdiste"
    div.innerHTML = `
        <div class="res-perdiste__img">
            <perdiste-el></perdiste-el>
        </div>
        <div class="res-perdiste__score">
            <score-el></score-el>
        </div>
        <div class="res-perdiste__button">
            <button-volver-jugar>Volver a jugar</button-volver-jugar>
        </div>
    `
    const button = div.querySelector("button-volver-jugar")
    state.setStart().then(()=>{    
        state.restartState()
        state.stopListening()
    })
    
    button?.addEventListener("click",()=>{
        params.goTo("/instructions")
        
    })
    return div
}