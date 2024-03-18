customElements.define("reset-button",
class extends HTMLElement {
    shadow: ShadowRoot
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: "open"})
    }
    connectedCallback(){
        const style = document.createElement("style")
        style.innerHTML = `
        .root{
            width: 322px;
            height: 87px;
            margin-top: 20px;
            border: solid #900C3F 10px;
            border-radius: 10px;
            background-color: #C70039;
            font-family: 'Odibee Sans', sans-serif;
            font-size: 45px;
            text-align: center;

        `
        this.shadow.appendChild(style)
        this.render()
    }
    render(){
        const button = document.createElement("button")
        button.textContent = this.textContent
        button.className = "root"
        this.shadow.appendChild(button)
    }
})