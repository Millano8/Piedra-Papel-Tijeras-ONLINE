import { state } from "../../state"
export function initIngresaCodigo(params){
    const div = document.createElement("div")
    state.restartGame()
    div.className = "init-ingresa-codigo"
    div.innerHTML = `
        <div class="init-ingresa-codigo__title">
            <h1>Piedra Papel o Tijeras</h1>
        </div>
        <form-ingresosala class="form"></form-ingresosala> 
        <div class="init-ingresa-codigo__button">
            <custom-button class="ingreso-sala">Ingreso a la Sala</custom-button>
        </div>
        <div class="init-ingresa-codigo__hands">
            <hands-el></hands-el>
        </div>
    ` // el form sala cambiarlo por form-ingresoSala
    const button = div.querySelector(".ingreso-sala")
    const currentState = state.getState()

    button?.addEventListener("click",()=>{
        state.accessToRoom()?.then(()=>{
            state.printingRtdbData().then(()=>{
                params.goTo("/instructions")
            })
        })
    })

    return div
}