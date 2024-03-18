import "./components/button-empezar"
import "./components/button-jugar"
import "./components/button-volver-a-jugar"
import "./components/perdiste-el"
import "./components/ganaste-el"
import "./components/score"
import "./components/hands-el"
import "./components/countDown-comp"
import "./components/button-reset"
import "./components/form-nombre"
import "./components/form-nombre2"
import "./components/form-sala"
import "./components/form-ingresoSala"
import "./components/countDown-comp"
import "./components/other-player-play"
import { initRouter } from "./router"

import * as dotenv from 'dotenv'
dotenv.config()

function main(){
    const root = document.querySelector(".root")
    initRouter(root)
}

main()  