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
})();
