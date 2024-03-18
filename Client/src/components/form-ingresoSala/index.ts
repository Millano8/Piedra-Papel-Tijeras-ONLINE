import { state } from "../../state";

customElements.define("form-ingresosala",
    class extends HTMLElement{
        shadow: ShadowRoot;
        constructor(){
            super();
            this.shadow = this.attachShadow({mode:"open"})
        }
        connectedCallback(){
            const style = document.createElement("style")
            style.innerHTML = `

                .root{
                    border: solid 10px #182460;
                    border-radius: 10px;
                    font-family: 'Odibee Sans', sans-serif;
                    font-size: 45px;
                    text-align: center;
                    width: 370px;
                    height: 100px;
            } 
            `
            this.shadow.appendChild(style)
            this.render()
        }
        render(){
            const form = document.createElement("form")
            const input = document.createElement("input")
            input.placeholder = "Código"
            form.appendChild(input)
            form.addEventListener("submit",(e)=>{
                e.preventDefault()
                const currentState = state.getState()
                currentState.codigoSala.shortCode = input.value
                state.setState(currentState)
            })
            input.className = "root"
            this.shadow.appendChild(form)
        }
    }
)
