import { rtdb } from "./rtdb";
import { ref, onValue } from "firebase/database";
import { Router } from "@vaadin/router";
const API_BASE_URL = "http://localhost:3000";
const state = {
    data: {
        nombre: "",
        email: "",
        firestoreRoomId: "",
        rtdbRoomId: "",
        messages: [],
    },
    listeners: [],
    init() {
        console.log("Soy state.init()");
        // SI NO HAY NOMBRE O EMAIL EN EL STATE, VUELVE A LA HOME PAGE
        const currentState = this.getState();
        if (currentState.nombre == null || currentState.email == null) {
            Router.go("/");
        }
    },
    getState() {
        return this.data;
    },
    //SETEA EL NOMBRE EN EL STATE
    setNombre(nombre) {
        console.log("Soy state.setNombre(nombre), con nombre: ", nombre);
        const currentState = this.getState(); // = data
        currentState.nombre = nombre; // = data.nombre
        //piso el nombre que tenía con el nombre recibido
        this.setState(currentState);
    },
    //setea el email en el state
    setEmail(email) {
        console.log("soy state.setEmail");
        const currentState = this.getState();
        currentState.email = email;
        //Le seteo toda la data nueva
        this.setState(currentState);
    },
    //Setea el idRoomSencillo Corto en el State
    setRoomIdSencillo(idRoomSencillo) {
        console.log("state.setidRoomSencillo: ", idRoomSencillo);
        const currentState = this.getState();
        currentState.firestoreRoomId = idRoomSencillo;
        this.setState(currentState);
    },
    //SETEA EL ROOM ID "LARGO" EN EL STATE
    setLongRoomId(roomIdLong) {
        console.log("soy state.setLongRoomId con rtdbRoomId: ", roomIdLong);
        const currentState = this.getState();
        currentState.rtdbRoomId = roomIdLong;
        this.setState(currentState);
    },
    //REQUEST DB/////////
    //1-SIGNUP:
    //CREA UN USUARIO Y DEVUELVE SU ID SENCILLO (firestoreRoomId)
    createNewUser(nombreYEmail) {
        console.log("state.createNewUser: ", nombreYEmail);
        //nombreYEmail: es {nombre: data, email: data}
        return fetch(API_BASE_URL + "/signup", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(nombreYEmail), //De JS a JSON
        })
            .then((res) => {
            return res.json();
        })
            .then((firestoreUserId) => {
            console.log("createNewUser.firestoreUserId: ", firestoreUserId);
            return firestoreUserId;
        });
    },
    //2-AUTH
    //INGRESA EL EMAIL DEL USUARIO Y RECIBE SU FIRESTORE USER ID
    getEmailAuth(email) {
        console.log("soy getEmailAuth con email: ", email);
        return fetch(API_BASE_URL + "/auth", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(email),
        })
            .then((res) => {
            return res.json();
        })
            .then((firestoreUserId) => {
            console.log("getEmailAuth.firestoreUserId: ", firestoreUserId);
            return firestoreUserId;
        });
    },
    //3-ROOMS:
    //Crea un nuevo Room poniendo al usuario como owner (dueño)
    //Le doy id de usuario y me devuelve id room sencillo
    createNewRoom(firestoreUserId) {
        console.log("state.createNewRoom con firestoreUserId: ", firestoreUserId);
        return fetch(API_BASE_URL + "/rooms", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(firestoreUserId),
        })
            .then((res) => {
            return res.json();
        })
            .then((idRoomSencillo) => {
            console.log("idRoomSencillo:", idRoomSencillo);
            return idRoomSencillo;
        });
    },
    setState(newState) {
        this.data = newState;
        for (const i of this.listeners) {
            i();
        }
        localStorage.setItem("state", JSON.stringify(newState));
        // console.log("Soy state.setState(newState) y mi newState es: ", newState);
    },
    //4−ROOMS/ROOM:ID
    //Con el firestoreRoomId que nos pasa askNewRoom() funciona ésta funcion
    connectToRoom(roomIdFacil, firestoreUserId) {
        console.log("soy state.connectToRoom");
        return fetch(API_BASE_URL + "/rooms/" + roomIdFacil + "?userId=" + firestoreUserId)
            .then((res) => {
            return res.json();
        })
            .then((rtdbRoomId) => {
            console.log("connectToRoom.rtdbRoomId: ", rtdbRoomId);
            return rtdbRoomId;
        });
    },
    //IMPORTA LOS MENSAJES DEL CHATROOM Y LOS AGREGA AL STATE
    importChatroom(rtdbRoomId) {
        console.log("state.importChatroom: ");
        const currentState = this.getState();
        const chatRoomsRef = ref(rtdb, "/rooms/" + rtdbRoomId);
        //Con onValue escucho los cambios en la rtdb
        onValue(chatRoomsRef, (snapshot) => {
            const messagesFromServer = snapshot.val();
            //Solo agrega los mensajes si el room los tiene
            if (messagesFromServer.messages !== undefined) {
                const messagesArray = Object.values(messagesFromServer.messages);
                currentState.messages = messagesArray;
                this.setState(currentState);
            }
        });
    },
    //Le manda al Backend el mensaje nuevo
    //La rtdb
    //Mezclo un dato nuevo, el message, con un dato que tenia: nombre.
    pushMessage(message) {
        console.log("soy state.pushMessage(message) con mensaje: ", message);
        const currentState = this.getState();
        const roomIdLong = currentState.rtdbRoomId;
        const nombreQueGuardeEnElState = this.data.nombre;
        fetch(API_BASE_URL + "/rooms/" + roomIdLong, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                from: nombreQueGuardeEnElState,
                message: message,
            }),
        });
    },
    subscribe(callback) {
        console.log("soy state.subscribe()");
        this.listeners.push(callback);
    },
    // signIn(callback?) {
    //   console.log("soy state.signIn()");
    //   const currentState = this.getState();
    //   if (currentState.email) {
    //     //si el State tiene el email que se quiere crear la cuenta,
    //     //osea, que ya tiene cuenta, hacemos un fetch.
    //     //fetch: buscar
    //     fetch(API_BASE_URL + "/auth", {
    //       method: "post",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: currentState.email,
    //       }),
    //     })
    //       .then((res) => {
    //         return res.json();
    //       })
    //       .then((data) => {
    //         console.log("firestoreUserId en signIn: ", data);
    //         currentState.firestoreUserId = data.firestoreUserId;
    //         this.setState(currentState);
    //         if (callback) {
    //           callback();
    //         }
    //       });
    //   } else {
    //     console.error("No hay email en el state");
    //     callback(true);
    //   }
    // },
    //El state le pide al servidor un nuevo room
    // //Pide un nuevo roomId y lo guarda en el State
    // askNewRoom(callback?) {
    //   //el ? hace al callback opcional
    //   console.log("soy state.askNewRoom");
    //   const currentState = this.getState();
    //   if (currentState.firestoreUserId) {
    //     //invocamos a la API
    //     fetch(API_BASE_URL + "/rooms/", {
    //       method: "post",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         userId: currentState.firestoreUserId,
    //       }),
    //     })
    //       .then((res) => {
    //         //Parseamos la respuesta a json (porque sino es un texto)
    //         return res.json();
    //       })
    //       .then((data) => {
    //         console.log("data en askNewRoom: ", data);
    //         //guardamos el nuevo roomId en el State
    //         currentState.firestoreRoomId = data.id;
    //         this.setState(currentState);
    //         if (callback) callback();
    //       });
    //   } else {
    //     console.error("No hay firestoreUserId");
    //   }
    // },
};
export { state };
