import { Route, Routes } from "react-router-dom";
import "./assets/styles/main.css";
import Headerr from "./components/user/header/Headerr";
import Slide from "./components/user/slider/Slide";
import Index from "./pages/user/homePage/Index";
import About from "./pages/user/about/About";
import Cart from "./pages/user/cart/Cart";
import ListProduct from "./pages/user/listProduct/ListProduct";
import Contact from "./pages/user/contact/Contact";
import Login from "./pages/user/Login/Login";
import Sign_In from "./pages/user/sign_in/Sign_In";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/list-product" element={<ListProduct />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Sign-in" element={<Login />} />
        <Route path="/Sign-up" element={<Sign_In />} />
      </Routes>
    </>
  );
}

export default App;
