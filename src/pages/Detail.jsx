import React ,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
const BookDetail = () => {
    const params = useParams();
    const [data,setData] = useState(null);
    const [url,setURL] = useState(null);
    const [qty,setQty] = useState(1);
    // console.log(data);

    const firebase = useFirebase();
   
      useEffect(()=>{
        firebase.getBookById(params.bookId).then((value)=> setData(value.data()))
    },[]);

    useEffect(()=>{
      if(data){
      const imageURL= data.imageURL;
      firebase.getImageURL(imageURL).then((url)=>setURL(url))
}},[data]);

const placeOrder = async() =>{
  alert("Order placed");
 const result = await firebase.placeOrder(params.bookId,qty);
//  console.log("order placed",result);
}

   if(data == null) return <h1>loading...</h1>

  return (
    <div className='container mt-5'>
    <h1>{data.name}</h1>
      <img src={url} width="50%" style={{borderRadius:"10px"}}/>
      <h1>Details :</h1>
      <p>Price: Rs.{data.price}</p>
      <h1>Owner Details</h1>
      <p>Name : {data.displayName}</p>
      <p>Email : {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Qty :</Form.Label>
        <Form.Control onChange={(e)=>setQty(e.target.value)} value={qty} type="Number" placeholder="Qty"  />
      </Form.Group>
      <Button onClick={placeOrder} variant="success">Bye Now</Button>
    </div>
  )
}

export default BookDetail
