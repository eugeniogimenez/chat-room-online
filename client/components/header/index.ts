class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = `
        <header class="header"></header>
    `;

    const style = document.createElement("style");
    style.innerHTML = `
        .header {
            height: 60px;
            background-color: #FF8282;
        }
    `;

    this.appendChild(style);
  }
}

customElements.define("header-comp", HeaderComponent);
