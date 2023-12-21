import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/firebase';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom"


const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [url,setURL] = useState(null);
    useEffect(()=>{
    firebase.getImageURL(props.imageURL).then((url)=>setURL(url));
    },[]);
    // console.log(url);
  return (
    <Card style={{ width: '14rem', margin: "10px" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a name {props.name} and it is sold by {props.displayName} which costs Rs.{props.price}
        </Card.Text>
        <Button onClick={e=>navigate(props.link)} variant="primary">View</Button>
      </Card.Body>
    </Card>
  )
}

export default BookCard
