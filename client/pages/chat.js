import { state } from "../state";
customElements.define("chat-page", class ChatPage extends HTMLElement {
    messages;
    shadow;
    connectedCallback() {
        this.shadow = this.attachShadow({ mode: "open" });
        //Traigo los mensajes del State y renderizo la page.
        const currentState = state.getState();
        this.messages = currentState.messages;
        this.render();
        console.log("render 1");
        state.subscribe(() => {
            //Cada vez que el State cambie, agrega los mjs nuevos a this.messages
            const currentState = state.getState();
            this.messages = currentState.messages;
            //Renderizo un nuevo chatroom
            this.shadow.lastChild.remove();
            this.render();
            console.log("render 2");
        });
    }
    //SE AGREGAN LOS LISTENERS PARA ESCUCHAR EL FORM DE CHAT
    addListeners() {
        const form = this.shadow.querySelector(".chat-form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const target = e.target;
            let newMessage = target["chat-message"].value;
            if (newMessage.trim() !== "") {
                //Se agregan los nuevos mensajes a la rtdb
                state.pushMessage(newMessage);
            }
            else {
                alert("Debes enviar un mensaje");
            }
        });
        //SE ASIGNA UN SCROLL AUTOMATICO PARA LLEGAR AL ÚLTIMO MJE
        const chatContainer = this.shadow.querySelector(".chat-container");
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    render() {
        const currentState = state.getState();
        this.shadow.innerHTML = `
            <header-comp></header-comp>
            
            <section class='section-home'>
              <h1 class='chat-home'>
                <text-comp class='title'>Chat</text-comp>
              </h1>

              <h3 class='chat-home'>
                <div class='subtitle'>room id: ${currentState.firestoreRoomId}</div>
              </h3>

              <div class='chat-container'></div>

              <form class='chat-form'>
                <input class='input' type="text" name='chat-message'>
                <button-comp class='text_button'>Enviar</button-comp>
              </form>
                

            </section>
        `;
        const chatContainer = this.shadow.querySelector(".chat-container");
        //createChatBubbles() importa los mensajes desde this.messages
        //y los agrega al chatContainer
        function createChatBubbles(messages) {
            //Itera los mensajes
            for (const message of messages) {
                const currentState = state.getState();
                //se crean los contenedores de las bubbles
                const bubble = document.createElement("div");
                //Si el from del message es igual al nombre del State, se crea una "user bubble"
                if (message.from === currentState.nombre) {
                    bubble.innerHTML = `
            <user-bubble textmessage='${message.message}' username='${message.from}'>
            
            </user-bubble>
            `;
                    chatContainer.appendChild(bubble);
                }
                //Si el from del message es distinto al nombre del State, se crea una "other bubble"
                if (message.from !== currentState.nombre) {
                    bubble.innerHTML = `
            <gray-bubble textmessage='${message.message}' username='${message.from}'>
            
            </gray-bubble>
            `;
                    chatContainer.appendChild(bubble);
                }
            }
        }
        //SE CREAN LAS BURBUJAS
        createChatBubbles(this.messages);
        const style = document.createElement("style");
        style.innerHTML = `
          .section-home{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        
          .chat-home{
              min-width: 312px;
          }

          .chat-container {
            height: 320px;
            border: 2px solid #000000;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 10px 10px;
            overflow: auto;
            min-width: 296px;
            margin-bottom: 12px;
          }

          .chat-container::-webkit-scrollbar {
            width: 12px;
          }
          
          .chat-container::-webkit-scrollbar-track {
            background: #d8d8d8;
          }
          
          .chat-container::-webkit-scrollbar-thumb {
            background-color: #9cbbe9;
            border-radius: 20px;
            border: 3px solid #d8d8d8;
          }

          .input {
            height: 55px;
            min-width: 312px;
            border: 2px solid #000000;
            border-radius: 4px;
            margin-bottom: 12px;
          }
        `;
        this.shadow.appendChild(style);
        this.addListeners();
    }
});
