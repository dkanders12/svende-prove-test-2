import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Forside from "./Pages/Forside";
import Sortering from "./Pages/Sortering";
import ArticleDetails from "./Pages/Article.Details/Article";
import SectionDetails from "./components/SortingDetails/Sortingdetails";
import GenbrugSteder from "./Pages/GenbrugSteder";
import RecyclingSiteDetails from "./Pages/Genbrug.Details/GenbrugDetails";
import ArtikelSite from "./Pages/ArtikelSite";
import LoginForm from "./components/Login/Login";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Forside />}></Route>
        <Route path="/sorteringguide" element={<Sortering />}></Route>
        <Route path="/genbrugsstationer" element={<GenbrugSteder />}></Route>
        <Route path="/Login" element={<LoginForm />}></Route>
        <Route path="/article/:id" element={<ArticleDetails />}></Route>{" "}
        <Route path="/section/:sectionId" element={<SectionDetails />}></Route>
        <Route
          path="/site-details/:id"
          element={<RecyclingSiteDetails />}
        ></Route>
        <Route path="/artikler" element={<ArtikelSite />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
