customElements.define("hands-el",
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
            const imgPapelEl = document.createElement("img")
            const imgPiedraEl = document.createElement("img")
            const imgTijeraEl = document.createElement("img")

            const imgPapel = new URL("../images/Papel.png", import.meta.url) as any;
            imgPapelEl.src = imgPapel;
            const imgPiedra = new URL("../images/Piedra.png", import.meta.url) as any;
            imgPiedraEl.src = imgPiedra;
            const imgTijera = new URL("../images/Tijera.png", import.meta.url) as any;
            imgTijeraEl.src = imgTijera

            containerImg.className = "container"
            const style = document.createElement("style")
            style.textContent = `
                .container{
                    display: flex;
                    jusify-content: center;
                    width: 100%;
                    gap: 15%;
                }

                img:hover{
                    cursor: pointer;
                }
            `


            containerImg.appendChild(imgPapelEl)
            containerImg.appendChild(imgPiedraEl)
            containerImg.appendChild(imgTijeraEl)
            
            this.shadow.appendChild(containerImg)
            this.shadow.appendChild(style)
        }
    }
)