import { Outlet } from "react-router-dom";
import classes from "./App.module.scss";
import Navbar from "./components/navBar/NavBar";

function App() {

  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
