class ButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = `
        <div class='button-container'>
            <button class='button'>${this.textContent}</button>
        </div>
        `;

    const style = document.createElement("style");
    style.innerHTML = `
            .button-container{
                
                height: 55px;
                min-width: 312px;
            }
            
            .button{
                width: 100%;
                height: 100%;
                background-color: #9CBBE9;
                border-radius: 4px;
            }
        `;

    this.appendChild(style);
  }
}

customElements.define("button-comp", ButtonComponent);
