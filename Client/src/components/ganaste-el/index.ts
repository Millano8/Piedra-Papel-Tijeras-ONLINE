customElements.define("ganaste-el",
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
            containerImg.className = "root"
            const imgGanasteEl = document.createElement("img")
            const imgGanaste = new URL("../images/ganaste.png", import.meta.url) as any
            imgGanasteEl.src = imgGanaste
            containerImg.appendChild(imgGanasteEl)

            this.shadow.appendChild(containerImg)
        }
    }
)