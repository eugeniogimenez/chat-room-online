import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "md9MSYiAiNJZmxVju4H3tgfzfXT1g7qh9IvXhmbJ",
    authDomain: "projectID.firebaseapp.com",
    databaseURL: "https://apx-dwf-m6-elg-default-rtdb.firebaseio.com",
};
//Inicializamos firebase
const app = initializeApp(firebaseConfig);
// Llamamos a la funcion getDatabase para llamar a la rtdb
const rtdb = getDatabase(app);
export { rtdb };
