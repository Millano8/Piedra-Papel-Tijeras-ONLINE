
export function initInicio(params){
    const div = document.createElement("div")
    div.className = "init-page"
    div.innerHTML = `
        <div class="init-page__title">
            <h1>Piedra Papel o Tijeras</h1>
        </div>
        <div class="init-page__button-nuevoJuego">
            <custom-button class="boton-nuevoJuego">Nuevo Juego</custom-button>
        </div>
        <div class="init-page__button-ingresarSala">
            <custom-button class="boton-nuevaSala">Ingresar a una Sala</custom-button>
        </div>
        <div class="init-page__hands">
            <hands-el></hands-el>
        </div>
    `
    const buttonNuevoJuego = div.querySelector(".boton-nuevoJuego")

    buttonNuevoJuego?.addEventListener("click",()=>{
        params.goTo("/inicio-nombre")    
    })

    const buttonNuevaSala = div.querySelector(".boton-nuevaSala")

    buttonNuevaSala?.addEventListener("click",()=>{
        params.goTo("/nombre-dos")
    })

    return div
}