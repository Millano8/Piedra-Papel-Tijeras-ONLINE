
export function initInicioSala(params){
    const div = document.createElement("div")
    div.className = "init-page-sala"
    div.innerHTML = `
        <div class="init-page-sala__title">
            <h1>Piedra Papel o Tijeras</h1>
        </div>
        <form-sala class="form"></form-sala>
        <div class="init-page-sala__button">
            <custom-button class="boton-inicio">Ingresar a la Sala</custom-button>
        </div>
        <div class="init-page-sala__hands">
            <hands-el></hands-el>
        </div>
    `
    const button = div.querySelector(".boton-inicio")

    button?.addEventListener("click",()=>{
        params.goTo("/inicio-nombre")
    })


    return div
}