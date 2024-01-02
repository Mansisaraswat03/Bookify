import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFirebase} from  "../context/firebase";

const Login = () => {
    const firebase = useFirebase();
    // console.log(firebase);

    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        if(firebase.isLoggedIn)
        navigate("/");
    },[firebase,navigate])

    const handleSubmit = async(e)=>{
      e.preventDefault();
      console.log("login...");
     const result = await firebase.signInUserWithEmailAndPassword(email,password);
      console.log("succsess...",result);
    }

  return (
    <div className='container mt-5'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    <h2 className='mt-2'>or</h2>
    <Button onClick={firebase.googleSignIn} variant='danger'>login with google</Button>
    <p>Don't have an Account  <a href ="/register" >Register</a></p>
      
    </div>
  )
}

export default Login
