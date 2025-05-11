import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import MarvelServices from "./services/MarvelService";
import "./style/style.scss";

const marvelService = new MarvelServices();
marvelService.getAllCharacters().then((res) => console.log(res));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
