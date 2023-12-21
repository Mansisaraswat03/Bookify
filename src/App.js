//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyNavbar from "./components/Navbar";
import List from "./pages/List";
import BookDetail from "./pages/Detail";
import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ViewOrderDetails from "./pages/ViewOrderDetails";


//css
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
    <MyNavbar/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/book/list" element={<List/>} />
    <Route path="/book/view/:bookId" element={<BookDetail/>} />
    <Route path="/book/orders" element={<Orders/>} />
    <Route path="/books/orders/:bookId" element={<ViewOrderDetails/>} />
   </Routes>
   </>
  );
}

export default App;
