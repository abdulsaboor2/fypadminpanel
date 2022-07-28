import React, {useState, useEffect} from 'react';

import SideBar from '../Component/SideBar';

import firebase from '../Component/FirebaseConfiguration/firebase'
import { useNavigate, useParams } from 'react-router-dom'

function FeedbackDetails(props) {
  const [star, setStar] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [hEmail, setHEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [comment, setComment] = useState("");
  const [hFullName, setHFullname] = useState("");
  const [cFullName, setCFullname] = useState("");
    
  const navigate = useNavigate();
  const {ids} = useParams()

  const cid=localStorage.getItem('CID')

  useEffect(() => {
    getFeedbackData();
    getHelperData();
    getCustomerData(cid);
  }, []);
    
  const getFeedbackData = async() => {
    try{
      await firebase.firestore().collection("Feedbacks").doc(ids).get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setComment(data.comment)
          setStar(data.star)
        } else {
          navigate("/Feedback")
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

  const getCustomerData = async(cid) => {
    try{
      await firebase.firestore().collection("Users").doc(cid).get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          //  setToken(data)

          setCFullname(data.fullName);
          setCEmail(data.email);
        } else {
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
  
  const getHelperData = async() => {
    
    try{
      await firebase.firestore().collection("Helpers").doc(ids).get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setHFullname(data.fullName);
          setHEmail(data.email);
          setSkills(data.skills)
        } else {
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

  const handleDeleteHelper = () => {
    firebase.firestore().collection("Feedbacks").doc(ids).delete().then(() => {
      alert("Document successfully deleted!");
      navigate("/Feedback");
    }).catch((error) => {
        alert("Error removing document: ", error);
    });
  }

  const refreshPage = () => {
    window.location.reload(false);
  }

    return (
        <div className='container-fulid p-0'>
        <div className='row'>
            <div className='col-lg-3'>
                <SideBar title="Feedback Details" />
            </div>
            <div className='col-lg-9'>
                <div className='row mt-3'>
                    <div className='col-lg-12 mt-4 mb-2'>
                        <h1 className='d-none d-lg-block'> Feedback Details</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12'>
                      <div className='row'>
                        <h4>Customer Details</h4>
                      </div>
                      <div className='row'>
                        <div className='table-responsive'>
                          <table className='table'>
                              <thead>
                              <tr>
                                
                              </tr>
                                  <tr>
                                      <th scope="col">Customer Name</th>
                                      <th scope="col">Customer Email</th>
                                      <th scope="col">Comment</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <th scope="row">{cFullName}</th>
                                      <td>{cEmail}</td>
                                      <td>{comment}</td>
                                    </tr>
                              </tbody>
                          </table>
                        </div>
                      </div>
                      <div className='row'>
                        <h4>Helper Details</h4>
                      </div>
                      <div className='row'>
                        <div className='table-responsive'>
                          <table className='table'>
                            <thead>
                              <tr>
                                  <th scope="col">Helper Name</th>
                                  <th scope="col">Helper Email</th>
                                  <th scope="col">Skills</th>
                                  <th scope="col">Star</th>
                              </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{hFullName}</th>
                                    <td>{hEmail}</td>
                                    <td>{skills}</td>
                                    <td>{star}</td>
                                  </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      
                    
                    <button className='btn btn-danger mt-3' onClick={handleDeleteHelper}>Delete Feedback</button>
                
                    </div>
                </div>
            </div>
        </div>   
    </div>
    );
}

export default FeedbackDetails;