"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//El CLIENTE es POSTMAN, y nosotros el SERVIDOR
const nanoid_1 = require("nanoid"); //importo nano id
const db_1 = require("./db"); //importo la DB
//EXPRESS
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json()); //parsea el body que le enviamos (req.body)
//CORS
const cors = require("cors"); //importo cors (permite al navegador usar apis)
app.use(cors()); //permite al navegador usar apis
//TenGo dos collection para entrecruzar
const usersCollection = db_1.firestore.collection("users");
const roomsCollection = db_1.firestore.collection("rooms");
//ENDPOINTS
app.get("/env", (req, res) => {
    res.json({
        environment: process.env.NODE_ENV,
    });
});
//1−SIGNUP: le doy de alta a un usuario
app.post("/signup", (req, res) => {
    //Me da el email y nombre
    const email = req.body.email;
    const nombre = req.body.nombre;
    //con .where() busco un documento en la collection con una condicion
    //busco el campo 'email'
    //con el operador '=='
    //y el req que le pasan, en este caso el email que manda el usuario
    //el get() activa la busqueda
    //el get devuelve una promise.
    usersCollection
        .where("email", "==", email)
        .get()
        .then((searchResponse) => {
        //empty: vacio
        //si lo que busco no está, que lo cree
        if (searchResponse.empty) {
            usersCollection
                .add({
                email,
                nombre, //nombre: nombre
            })
                .then((newUserRef) => {
                //El objeto "response" tiene el metodo json() para responder con objetos json
                res.json({
                    id: newUserRef.id,
                    new: true, //es para poder distinguir a un usuario recien creado
                });
            });
        }
        else {
            res.status(400).json({
                message: "user already exists", //usuario ya existe
            });
        }
    });
});
//2−AUTH: me da el id interno de la bd (firestore)
app.post("/auth", (req, res) => {
    // const email = req.body.email;
    const { email } = req.body; //las {} son para extraer de body y declarar "email"
    usersCollection
        .where("email", "==", email)
        .get()
        .then((searchResponse) => {
        //empty: vacio
        //si lo que busco no está, que responda no encontrado
        if (searchResponse.empty) {
            res.status(400).json({
                message: "not found", //usuario no encontrado
            });
        }
        else {
            //Si encuentra el email, me da el id de ese usuario en firestore/users.
            res.json({
                firestoreUserId: searchResponse.docs[0].id,
            });
        }
    });
});
//3−ROOMS
//crea el room en rtdb y bd (firestore) y devuelve un id
//firestore: id amigable
app.post("/rooms", (req, res) => {
    const { userId } = req.body; //le doy el id de firestore/users
    usersCollection
        .doc(userId.toString()) //Crea un documento
        .get()
        .then((doc) => {
        if (doc.exists) {
            //Si existe el id en firestore
            //en la rtdb creo un id.
            const roomsRtdbRef = db_1.rtdb.ref("rooms/" + (0, nanoid_1.nanoid)());
            roomsRtdbRef
                //seteo en ese id un {} con un mensaje vacio y
                //un owner con el id de firestore.
                .set({
                messages: [],
                owner: userId, //owner = dueño
            })
                .then(() => {
                const rtdbRoomsNanoId = roomsRtdbRef.key; //me da el id de rtdb
                //creo un id facil para el room
                const roomIdFacil = 1000 + Math.floor(Math.random() * 999);
                //vuelvo a firestore a la collection "rooms"
                roomsCollection
                    .doc(roomIdFacil.toString()) //creo un documento
                    .set({
                    rtdbRoomId: rtdbRoomsNanoId, //le digo que id de room es el key de la rtbd
                })
                    .then(() => {
                    res.json({
                        //el id del room en firestore es el nro facil
                        id: roomIdFacil.toString(),
                    });
                });
            });
        }
        else {
            res.status(401).json({
                message: "no exists",
            });
        }
    });
});
//4−ROOMS/ROOM:ID
//con el roomid amigable pueda recuperar el roomid complejo.
app.get("/rooms/:roomIdFacil", (req, res) => {
    const { userId } = req.query; //extraigo del query el userId
    const { roomIdFacil } = req.params;
    usersCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
        if (doc.exists) {
            roomsCollection
                .doc(roomIdFacil)
                .get()
                .then((snap) => {
                const data = snap.data();
                res.json(data);
            });
        }
        else {
            res.status(401).json({
                message: "no exists",
            });
        }
    });
});
//para el state.pushMessage
app.post("/rooms/:roomLongId", function (req, res) {
    const chatRoomRef = db_1.rtdb.ref("/rooms/" + req.params.roomLongId + "/messages");
    chatRoomRef.on("value", (snap) => {
        let value = snap.val();
    });
    chatRoomRef.push(req.body, function () {
        res.json("todo ok");
    });
});
//EXPRESS STATIC
app.use(express.static("dist"));
//RETURN TO index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
