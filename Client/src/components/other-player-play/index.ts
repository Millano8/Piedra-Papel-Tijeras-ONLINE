import { state } from "../../state";
type Jugada = "piedra" | "papel" | "tijeras"

const imgPapel = new URL("../images/Papel.png", import.meta.url) as any
const imgPiedra = new URL("../images/Piedra.png", import.meta.url) as any
const imgTijera = new URL("../images/Tijera.png", import.meta.url) as any


customElements.define("other-play",
 class extends HTMLElement{
   shadow: ShadowRoot
   constructor(){
    super()
    this.shadow = this.attachShadow({mode:"open"})
   }
   connectedCallback(){
    const style = document.createElement("style")
    style.innerHTML = `
        .root{
            heigth: 250px;
            width: 100px;
        }
    `
    
    this.shadow.appendChild(style)
    this.render()
   }
   
   render(){
    const currentState = state.getState()
    const owner = currentState.users.owner
    let otherPlayerPlay = ""
    if (owner =="") {
        otherPlayerPlay = currentState.currentGame.player1Play
    } else {
        otherPlayerPlay = currentState.currentGame.player2Play
    }


    const div = document.createElement("div")

    if (otherPlayerPlay === "tijeras"){
        div.innerHTML = `
            <img src="${imgTijera}" class="root"/>
        `
    } else if (otherPlayerPlay === "papel") {
        div.innerHTML = `
            <img src="${imgPapel}" class="root"/>
        `
    } else if (otherPlayerPlay == "piedra") {
        div.innerHTML= `
            <img src="${imgPiedra}" class="root"/>
        `
    }
    this.shadow.appendChild(div)
   }

})
