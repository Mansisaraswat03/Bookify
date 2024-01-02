//pages
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyNavbar from "./components/Navbar";
import List from "./pages/List";
import BookDetail from "./pages/Detail";
import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ViewOrderDetails from "./pages/ViewOrderDetails";
import {messaging} from "./context/firebase"
import { getToken } from "firebase/messaging";

//css
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {



 async function requestpermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    // Generate Token
    const token = await getToken(messaging, {
      vapidKey:
        "BJG_W4EHBbzlD1876BWHDdEZ64LSkPgQkxLnWr4rj_b2lVbrIsHI41IrFjUqBSNFUFJeenPeuCjqnTPZ-LTKrM4",
    });
    console.log("Token Gen", token);
    // return token ;
    // Send this token  to server ( db)
  } else if (permission === "denied") {
    alert("You denied for the notification");
  }
}

useEffect(() => {
  // Req user for notification permission
  requestpermission();
  
}, []);

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
