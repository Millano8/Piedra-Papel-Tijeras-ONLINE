import { initInicio } from "./pages/inicio"
import {initInstructions} from "./pages/instructions"
import {initInicioNombre} from "./pages/inicio-nombre"
import { initInicioSala } from "./pages/inicio-sala"
import { initInicioSalaCodigo } from "./pages/inicio-codigo"
import { initIngresaCodigo } from "./pages/ingresa-codigo"
import { nombreDos } from "./pages/nombre-dos"
import { salaEspera } from "./pages/sala-espera"
import { initJuego } from "./pages/juego"
import { initPelea } from "./pages/pelea"
import {initGanaste} from "./pages/resultado/ganaste"
import {initPerdiste} from "./pages/resultado/perdiste"


const routes = [
    {
        path: /\/resultadoPerdiste/,
        component: initPerdiste
    },
    {
        path: /\/resultadoGanaste/,
        component: initGanaste
    },
    {
        path: /\/pelea/,
        component: initPelea
    },
    {
        path: /\/juego/,
        component: initJuego
    },
    {
        path: /\/sala-espera/,
        component: salaEspera
    },
    {
        path: /\/nombre-dos/,
        component: nombreDos
    },
    {
        path: /\/ingresa-codigo/,
        component: initIngresaCodigo
    },
    {
        path: /\/comparti-codigo/,
        component: initInicioSalaCodigo
    },
    {
        path: /\/inicio/,
        component: initInicio
    },
    {
        path: /\/instructions/,
        component: initInstructions
    },
    {
        path: /\/inicio-sala/,
        component: initInicioSala
    },
    {
        path: /\/inicio-nombre/,
        component: initInicioNombre
    },
]

export function initRouter(container: any){

    function goTo(path) {
        history.pushState({},"",path);
        handleRoute(path)
    }
    function handleRoute(route){

        for (const r of routes) {
            if (r.path.test(route)) {
                const el = r.component({goTo:goTo})

                if (container.firstChild) {
                    container.firstChild.remove()
                }
                container.appendChild(el)
            }
        }
            }

    if (location.pathname == "/"){
        goTo("/inicio")
    } else {
        handleRoute(location.pathname)        
    }

}