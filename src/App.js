import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./Components/Nav/NavBar";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
