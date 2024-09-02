import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Forside from "./Pages/Forside";
import Sortering from "./Pages/Sortering";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Forside />}></Route>
        <Route path="/sorteringguide" element={<Sortering />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
