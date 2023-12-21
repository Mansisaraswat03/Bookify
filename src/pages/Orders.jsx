import React, { useEffect ,useState} from 'react';
import { useFirebase } from '../context/firebase';
import BookCard from "../components/Card" 

const Orders = () => {
  const [books,setBooks] = useState([])
  const firebase = useFirebase();
  useEffect(()=>{
    if(firebase.isLoggedIn)
    firebase.fetchMyBooks(firebase.user.uid).then((books)=>setBooks(books.docs))
  },[firebase]);

  if(!firebase.isLoggedIn) return <h1>please Login</h1>
  return (
    <div>
    {
      books.map((book)=>(<BookCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()}/>))
      }
    </div>
  )
}

export default Orders
