import React, {useState, useEffect} from 'react';

import SideBar from '../Component/SideBar';

import firebase from '../Component/FirebaseConfiguration/firebase'
import { useNavigate, useParams } from 'react-router-dom';

function CustomerDetails(props) {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImage] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const {ids} = useParams();
  
  useEffect(()=>{
    getUserData();
  }, [])

  const getUserData = async() => {
    try{
      await firebase.firestore().collection("Users").doc(ids).get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setFullname(data.fullName);
          setEmail(data.email);
          setAddress(data.Address);
          setPhone(data.phone);
          setImage(data.images);
          setLat(data.lat);
          setLong(data.long);
          setId(data.id)
        } 
        else {
          navigate("/Customer")
          alert("No such document!");
        }
      })
      .catch((error) => {
        alert("Error getting document:", error);
      });
    }
    catch(err){
      alert(err);
    }
  }

  const updateUser = () => {
    try{
      firebase.firestore().collection("Users").doc(ids).set({
        Address: Address,
        email: email,
        fullName: fullName,
        id: id,
        lat: lat,
        long: long,
        phone: phone,
        images: images,
      }).then((docRef) => {
        navigate("/Customer")
      }).catch((error) => {
        alert("Error: ", error);
      });
    }
    catch(err){
      alert("Errors one: ", err);
    }
  };

  const handleDeleteUser = () => {
    firebase.firestore().collection("Users").doc(ids).delete().then(() => {
      alert("Document successfully deleted!");
      navigate("/Customer")
    }).catch((error) => {
        alert("Error removing document: ", error);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

return (
    <div className='container-fulid p-0'>
        <div className='row'>
            <div className='col-lg-3'>
                <SideBar title="Customer Details" />
            </div>
            <div className='col-lg-9'>
                <div className='row mt-3'>
                    <div className='col-lg-12 mb-4 mt-2'>
                        <h1 className='d-none d-lg-block'> Customer Details</h1>
                    </div>
                </div>
                <div className='row'>
                  <div className='col-lg-8'>
                    <form className='form m-5 mt-3' onSubmit={handleSubmit} >
                      <label>Name</label><br />
                      <input 
                        type={"text"} 
                        placeholder="Name" 
                        className='form-control'
                        value={fullName} 
                        onChange={(e) => setFullname(e.target.value)}
                        /><br />
                      <label>Email</label><br />
                      <input 
                        className='form-control'
                        type={"email"} 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        /><br />
                      <label>Address</label><br />
                      <input 
                        type={'Address'}
                        className='form-control'
                        placeholder="Address" 
                        value={Address} 
                        onChange={(e) => setAddress(e.target.value)}
                        /><br />
                      <label>Phone</label><br />
                      <input 
                        type={"number"} 
                        className='form-control'
                        placeholder="Phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                      /><br />
                      <button className='btn btn-primary mt-3' onClick={updateUser} style={{marginRight:20}}>Update</button>
                      <button className='btn btn-danger mt-3' onClick={handleDeleteUser}>Delete</button>
                    </form>
                  </div>
                </div>
            </div>
        </div>   
    </div>  
  );
}

export default CustomerDetails;