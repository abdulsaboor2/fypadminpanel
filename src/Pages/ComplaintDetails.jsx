import React, { useEffect, useState } from 'react';

import SideBar from '../Component/SideBar';
import Button from '../Component/Button';
import firebase from '../Component/FirebaseConfiguration/firebase'
import { useNavigate, useParams } from 'react-router-dom'

function ComplaintDetails(props) {
    
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    let updatedStatus = "Pending";

    const navigate = useNavigate();
    const {ids} = useParams();

    useEffect(()=>{
      getComplainData();
    }, [])

    const getComplainData = async() => {
        try{
          await firebase.firestore().collection("Complain").doc(ids).get().then((doc) => {
            if (doc.exists) {
              const data = doc.data();
              setFullname(data.fullName);
              setEmail(data.email);
              setMessage(data.message);
              setStatus(data.status);
            } else {
              navigate("/Complain")
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

      const handleResolve = async(e) => {
        e.preventDefault();
        updatedStatus ="Resolved";
        await updateComplain();
      }

      const handleCLose = (e) => {
        e.preventDefault();
        updatedStatus = "Closed";
        updateComplain();
      }

      const handleReOpen = (e) => {
        e.preventDefault();
        updatedStatus = "Re-Open";
        updateComplain();
      }

      const handlePending = async(e) => {
        e.preventDefault();
        await updateComplain();
      }

      const updateComplain = async() => {
        try{
          await firebase.firestore().collection("Complain").doc(ids).set({
            email,
            fullName,
            id: ids,
            message,
            status: updatedStatus,
          }).then((docRef) => {
            navigate("/Complain")
          }).catch((error) => {
            alert("Error: ", error);
          });
        }
        catch(err){
          alert("Errors: ", err);
        }
      };


    const handleMail = (e) => {
        window.location.href = "mailto:" + email;
        e.preventDefault();
    }

    return (
        <div className='container-fulid p-0'>
        <div className='row'>
            <div className='col-lg-3'>
                <SideBar title="Complain Details" />
            </div>
            <div className='col-lg-9'>
                <div className='row mt-3'>
                    <div className='col-lg-12 mt-4 mb-2'>
                        <h1 className='d-none d-lg-block'> Complain Details</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12'>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">status</th>
                                        <th scope="col">Message</th>
                                        <th scope="col">Response</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">{fullName}</td>
                                        <td>{email}</td>
                                        <td>{status}</td>
                                        <td>{message}</td>
                                        <td>
                                            <Button 
                                              target="_blank"
                                              onClick={handleMail} 
                                              className="btn btn-link"
                                              title="Go to Mail" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-6 col-xs-6'>
                                <Button className="btn btn-success ms-4 me-2" title="Resolve" onClick={handleResolve} />
                                <Button className="btn btn-danger me-2" title="Close" onClick={handleCLose} />
                                <Button className="btn btn-info me-2" title="Re-Open" onClick={handleReOpen} />
                                <Button className="btn btn-warning me-2" title="Pending" onClick={handlePending} />
                            </div>
                            
                            
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>   
    </div>
    );
}

export default ComplaintDetails;