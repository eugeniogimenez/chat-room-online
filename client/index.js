import { state } from "./state";
import "../server/router";
//components
import "./components/button";
import "./components/chatbubble";
import "./components/header/";
import "./components/text";
//pages
import "./pages/home";
import "./pages/chat";
(function () {
    console.log("soy main");
    state.init();
    // //Esto sucede en el submit del form de la primera pantalla
    // state.setEmailAndFullName("marce@apx.school", "Marce");
    // //creo mi usuario
    // state.signIn((err) => {
    //   if (err) console.error("hubo un error");
    //   //creo un room
    //   state.askNewRoom(() => {
    //     state.accessToRoom(); //para que se ejecute accesToRoom despues que askNewRoom se lo paso por callback
    //   });
    // });
    //propuesta para evitar la primera pantalla
    //al comenzar
    // state.init();
    // //recupera el State del loacalStorage
    // const currentState = state.getState();
    // if (currentState.rtdbRoomId && currentState.firestoreUserId) {
    //   router.push("/chat");
    // }
})();
