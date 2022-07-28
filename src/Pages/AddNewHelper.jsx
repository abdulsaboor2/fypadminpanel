import React, {useState,} from 'react';

import Search from '../Component/Search';
import SideBar from '../Component/SideBar';
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
import firebase from '../Component/FirebaseConfiguration/firebase'
import Form from 'react-bootstrap/Form'

function AddNewHelper(props) {
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [images, setImage] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [id, setId] = useState("");
    const [pass, setPass] = useState("123456");
    const [skills, setSkills] = useState("");
    const [star, setStar] = useState("0");
    const [count, setCount] = useState("0");
    const [sum, setSum] = useState("0");

    const navigate = useNavigate();

    function handleSubmit(event) {
    event.preventDefault();
    }

  const AddHelper = async() => {
    if(!email){
        alert("Please Add Your Email")
    }
    else{
      try {
        
        await firebase.auth().createUserWithEmailAndPassword(email, pass).then((response) => {
            const uid = response.user.uid;
            setId(uid);
            const data = {
              id: uid,
              email,
              fullName,
              phone,
              Address,
              lat,
              long,
              images,
              skills,
              count,
              star,
              sum,
            };
            firebase.firestore().collection("Helpers").doc(uid).set(data).then(() => {          
                navigate("/Helper")
                alert("Helper Successfully Added");
              })
              .catch((error) => {
                alert(error.toString());
              });
          })
          .catch((error) => {
            alert(error.toString())
          });
      } catch (error) {
        alert(error.toString());
      }
    }
  };

    const uploadImage = async () => {
        try{
            const response = await fetch(images);
            firebase.storage().ref().child(123).put(response.blob());
        }
        catch(err){
            alert("yeh" + err)
        }
        
    };

    return (
        <div className='container-fulid p-0'>
        <div className='row'>
            <SideBar title="Add New Customer"/>
            <div className='col-lg-9'>
                <div className='row'>
                    <div className='col-lg-12 mt-4 mb-2' >
                        <h1 className='d-none d-lg-block'> Add New Customer</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className={' col-lg-8 col-xs-12 col-sm-12 mt-4'}>
                        <form className='form m-5 mt-3' onSubmit={handleSubmit} >
                            <label>Name</label><br />
                            <input 
                              type={"text"} 
                              placeholder="Name" 
                              className='form-control'
                              value={fullName} 
                              onChange={(e) => setFullname(e.target.value)}
                              /><br />
                            <label>Email*</label><br />
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
                            <label>Skill</label><br />
                            <input 
                              type={"text"} 
                              className='form-control'
                              placeholder="Skill" 
                              value={skills} 
                              onChange={(e) => setSkills(e.target.value)}
                            /><br />
                            {/* <label>Image</label><br />
                            <image width={"250px"} src={images} alt="User Profile" />
                            <input 
                                type="file"
                                accept='image/*'
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                }}
                            /> */}
                            <button className='btn btn-primary mt-4' onClick={AddHelper}>Add Helper</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>   
    </div>
    );
}

export default AddNewHelper;