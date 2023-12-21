import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFirebase} from "../context/firebase"
const List = () => {
    const firebase = useFirebase();
    const [name,setName]= useState('');
    const [isbnNumber,setIsbnNumber] = useState('');
    const [price,setPrice] = useState('');
    const [coverPic,setCoverPic] = useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await firebase.handleNewListing(name,isbnNumber,price,coverPic)
    }
  return (
    <div className='container mt-5'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Name</Form.Label>
        <Form.Control onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Book Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>IsbnNumber</Form.Label>
        <Form.Control onChange={(e)=>setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="ISBN Number" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control onChange={(e)=>setPrice(e.target.value)} value={price} type="number" placeholder="Price" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>IsbnNumber</Form.Label>
        <Form.Control onChange={(e)=>setCoverPic(e.target.files[0])}  type="file"  />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
    </div>
  )
}

export default List
