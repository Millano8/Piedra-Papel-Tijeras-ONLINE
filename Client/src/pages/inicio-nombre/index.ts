import { state } from "../../state"
export function initInicioNombre(params){
    const div = document.createElement("div")
    div.className = "init-page-nombre"
    div.innerHTML = `
        <div class="init-page-nombre__title">
            <h1>Piedra Papel o Tijeras</h1>
        </div>
        <form-nombre class="form"></form-nombre>
        <div class="init-page-nombre__button">
            <custom-button class="boton-inicio">Empezar</custom-button>
        </div>
        <div class="init-page-nombre__hands">
            <hands-el></hands-el>
        </div>
    `
    const button = div.querySelector(".boton-inicio")

    button?.addEventListener("click",()=>{
        
        state.signIn()?.then(()=>{
            state.accesToRoom2()?.then(()=>{
                const currentState = state.getState()
                const owner = currentState.users.player1
                if (owner == ""){
                    alert("Necesita que se le impute un nombre")
                } else {
                    params.goTo("/comparti-codigo")
                }
                })
        })
         
    })

    return div
}