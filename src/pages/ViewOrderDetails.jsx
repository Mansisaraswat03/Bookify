import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const ViewOrderDetails = () => {
  const firebase = useFirebase();
    const params =useParams();
    const[orders,setOrders] = useState([]);

    useEffect(()=>{
      firebase.getOrders(params.bookId).then((orders)=> setOrders(orders.docs))
    },[])
  return (
    <div className='container'>
      <h1> Orders </h1>
      {
        orders.map(order=>{
          const data = order.data();
          return(
            <div key={order.id} className='mt-6' style={{border:"1px solid grey", padding:"10px"}}>
           <h4> Order By : {data.displayName}</h4>
           <h6> Qty : {data.qty}</h6>
           <p> Email : {data.userEmail}</p>
            
            </div>
          )
        })
      }
    </div>
  )
}

export default ViewOrderDetails
