class TextComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    const clase = this.getAttribute("class");

    this.innerHTML = `
          <div class="${clase}">${this.textContent}</div>
      `;

    const style = document.createElement("style");
    style.innerHTML = `
          .title {
              font-size: 52px;
              font-family: Roboto;
          }

          .subtitle{
            font-size: 24px;
            font-family: Roboto;
            
          }

          .text_button{
            font-size: 22px;
            font-family: Roboto;
            
          }

          .text_chat{
            font-size: 18px;
            font-family: Roboto;
            
          }

          .text_chat_name{
            font-size: 14px;
            font-family: Roboto;
            
          }
      `;

    this.appendChild(style);
  }
}

customElements.define("text-comp", TextComponent);
