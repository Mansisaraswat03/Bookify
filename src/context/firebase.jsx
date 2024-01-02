import React, { createContext,useContext,useEffect,useState } from "react";
import {initializeApp} from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth";
import {getFirestore,collection,addDoc,getDocs,getDoc,doc,query,where} from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {getMessaging} from "firebase/messaging";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyCFyjzP9LhbIf54fWxhJP12BC-TmEYYmiY",
    authDomain: "bookstore-60181.firebaseapp.com",
    projectId: "bookstore-60181",
    storageBucket: "bookstore-60181.appspot.com",
    messagingSenderId: "964036647944",
    appId: "1:964036647944:web:16bb6215ad7c5797b8c5bd"
  };

export const useFirebase =()=> useContext(FirebaseContext);
const FirebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(FirebaseApp)
 export const FirebaseAuth = getAuth(FirebaseApp);
const firestore = getFirestore(FirebaseApp)
const storage = getStorage(FirebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider =(props)=>{
    const [user,setUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(FirebaseAuth,(user)=>{
            if(user){
                console.log("logged in")
                setUser(user);
            }
            else {
                console.log("logged out")
                setUser(null);}
        })
    },[])
    const signupWithEmailAndPassword =(email,password)=> createUserWithEmailAndPassword(FirebaseAuth,email,password);
    const signInUserWithEmailAndPassword =(email,password)=> signInWithEmailAndPassword(FirebaseAuth,email,password);
    const googleSignIn =() => signInWithPopup(FirebaseAuth,googleProvider);
    const isLoggedIn = user ? true : false;
    const handleNewListing = async(name,isbn,price,cover)=>{
   const coverRef = ref(storage,`uploads/images/${Date.now()}-${cover.name}`) 
    const uploadResult = await uploadBytes(coverRef,cover);
    return await addDoc(collection(firestore,'books'),{
        name,
        isbn,
        price,
        imageURL : uploadResult.ref.fullPath,
        userID: user.uid,
        userEmail : user.email,
        displayName : user.displayName,
        photoURL : user.photoURL,
       
    })
    }

    const listAllBooks = ()=>{
        return getDocs(collection(firestore,"books"))
    }

    const getImageURL = (path)=>{
        return getDownloadURL(ref(storage,path));
    }

    const getBookById = async(id)=>{
        const docRef = doc(firestore,"books",id)
        const result = await getDoc(docRef)
        return result;
    }

    const placeOrder = async(bookId,qty)=>{
        const collectionRef = collection(firestore,"books",bookId,"orders")
        const result = await addDoc(collectionRef,{
        userID: user.uid,
        userEmail : user.email,
        displayName : user.displayName,
        photoURL : user.photoURL,
        qty:Number(qty),
        });
        return result;
    }

    const fetchMyBooks =async(userId)=>{
        // if(!user) return null;
        const collectionRef = collection(firestore,"books");
        const q = query(collectionRef,where("userID","==",userId));
        const result = await getDocs(q);
        return result;
    }

    const getOrders = async(bookId)=>{
        const collectionRef = collection(firestore,"books",bookId,"orders");
        const result = await getDocs(collectionRef);
        return result;
    }

    

    return(
        <FirebaseContext.Provider value={{signupWithEmailAndPassword,signInUserWithEmailAndPassword,googleSignIn,handleNewListing,listAllBooks,getImageURL,getBookById,placeOrder,fetchMyBooks,getOrders,user, isLoggedIn}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}