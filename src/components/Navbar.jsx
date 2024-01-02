import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {HiOutlineUserCircle} from "react-icons/hi";
import { useFirebase } from '../context/firebase';
import { signOut } from 'firebase/auth';
import { FirebaseAuth } from '../context/firebase';

const MyNavbar = () => {
  const firebase = useFirebase();
  // console.log(firebase.user);
  if(firebase.isLoggedIn){
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark" >
      <Container className='d-flex justify-content-between'>
        <Navbar.Brand href="/"><img src="/book_logo.png" alt="book" height="60" width="60"/></Navbar.Brand>
        <Nav className="me-auto navbar">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
          <div onClick={()=>signOut(FirebaseAuth)} className="nav-link ms-1000"  >
             <HiOutlineUserCircle/>
           </div>
         
        </Nav>
      </Container>
    </Navbar>
    </>
  )
  }
  else{
    return (
      <>
      <Navbar bg="dark" data-bs-theme="dark" >
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand href="/"><img src="/book_logo.png" alt="book" height="60" width="60"/></Navbar.Brand>
          <Nav className="me-auto navbar">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
          {/* <div onClick={()=>signOut(FirebaseAuth)} className="nav-link ms-1000"  >
             <HiOutlineUserCircle/>
           </div> */}
           
          </Nav>
        </Container>
      </Navbar>
      </>
    )
  }

}

export default MyNavbar



