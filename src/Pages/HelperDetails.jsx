import React, {useState, useEffect} from 'react';

import SideBar from '../Component/SideBar';
import firebase from '../Component/FirebaseConfiguration/firebase'
import { useNavigate, useParams } from 'react-router-dom'


function HelperDetails(props) {
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [skills, setSkills] = useState("");
    const [star, setStar] = useState("");
    const [images, setImage] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [id, setId]= useState("");
    const [sum, setSum]= useState("");
    const [count, setCount]= useState("");

    const navigate = useNavigate();
    const {ids} = useParams();

    useEffect(() => {
        getHelperData();
    }, []);
      
      
    const getHelperData = async() => {
        
      try{
        await firebase.firestore().collection("Helpers").doc(ids).get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            //  setToken(data)
            setFullname(data.fullName);
            setEmail(data.email);
            setAddress(data.Address);
            setPhone(data.phone);
            setLat(data.lat);
            setLong(data.long);
            setId(data.id);
            setStar(data.star);
            setSkills(data.skills);
            setLat(data.lat);
            setLong(data.long);
            setSum(data.sum);
            setCount(data.count);
          } else {
            navigate("/Helper")
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
  
    const updateHelper = () => {
      try{
        firebase.firestore().collection("Helpers").doc(ids).set({
          Address: Address,
          email: email,
          fullName: fullName,
          id: id,
          lat: lat,
          long: long,
          phone: phone,
          skills: skills,
          star: star,
          sum:sum,
          count:count,
        }).then((docRef) => {
          navigate("/Helper")
        }).catch((error) => {
          alert("Error: ", error);
        });
      }
      catch(err){
        alert("Errors: ", err);
      }
    };
  
    const handleDeleteHelper = () => {
      firebase.firestore().collection("Helpers").doc(ids).delete().then(() => {
        alert("Document successfully deleted!");
        navigate("/Helper");
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
                <SideBar title="Helper Details" />
            </div>
            <div className='col-lg-9'>
                <div className='row mt-3'>
                    <div className='col-lg-12 mb-4 mt-2'>
                        <h1 className='d-none d-lg-block'> Helper Details</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-8'>
                    <form className='form m-5 mt-3' onSubmit={handleSubmit} >
                    <label>Name</label><br />
                    <input 
                        type={"text"} placeholder="Name" 
                        className='form-control'
                        value={fullName} 
                        onChange={(e) => setFullname(e.target.value)} /><br />
                    <label>Email</label><br />
                    <input 
                        type={"email"} 
                        placeholder="Email"
                        className='form-control'
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        /><br />
                    <label>Address</label><br />
                    <input 
                        type={'Address'} 
                        placeholder="Address"
                        className='form-control'
                        value={Address} 
                        onChange={(e) => setFullname(e.target.value)} /><br />
                    <label>Skills</label><br />
                    <input 
                        type={'text'} 
                        placeholder="Skills"
                        className='form-control'
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)}
                               /><br />
                    <label>Stars</label><br />
                    <input 
                        type={"star"} 
                        placeholder="Stars"
                        className='form-control'
                        value={star} 
                        onChange={(e) => setStar(e.target.value)} /><br />
                    <label>Phone</label><br />
                    <input 
                        type={"number"} 
                        placeholder="Phone No." 
                        className='form-control'
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        /><br />
                    <button className='btn btn-primary mt-3' onClick={updateHelper} style={{marginRight:20}}>Update</button>
                    <button className='btn btn-danger mt-3' onClick={handleDeleteHelper}>Delete</button>
                </form>
                    </div>
                </div>
            </div>
        </div>   
    </div>
    );
}

export default HelperDetails;