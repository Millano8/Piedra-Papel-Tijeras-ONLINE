import { state } from "../../state";

export function nombreDos(params){
    const div = document.createElement("div")
    div.className = "init-page-nombre2"
    div.innerHTML = `
    <div class="init-page-nombre2__title">
    <h1>Piedra Papel o Tijeras</h1>
    </div>
    <form-nombredos class="form2"></form-nombredos>
    <div class="init-page-nombre2__button">
        <custom-button class="boton-nombre-dos">Ir a ingreso Sala</custom-button>
    </div>
    <div class="init-page-nombre2__hands">
        <hands-el></hands-el>
    </div>
    `

    const button = div.querySelector(".boton-nombre-dos")
    button?.addEventListener("click",()=>{
        const currentState = state.getState()
        const player2 = currentState.users.player2
        if (player2 == ""){
            alert("No hay ningun player2")
        } else {
            params.goTo("/ingresa-codigo")
        }
    })
    return div
}