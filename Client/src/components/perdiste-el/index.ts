

customElements.define("perdiste-el",
    class extends HTMLElement{
        shadow: ShadowRoot;
        constructor(){
            super();
            this.shadow = this.attachShadow({mode:"open"})
        }
        connectedCallback(){
            this.render()
        }
        render(){
            const containerImg = document.createElement("div")
            const imgPerdisteEl = document.createElement("img")
            const imgPerdiste = new URL("../images/perdiste.png", import.meta.url) as any
            imgPerdisteEl.src = imgPerdiste
            containerImg.appendChild(imgPerdisteEl)

            this.shadow.appendChild(containerImg)
        }
    }
)