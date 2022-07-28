import React, { useState } from 'react';

import Search from '../Component/Search';
import SideBar from '../Component/SideBar';
import {NavLink, Link } from 'react-router-dom';
import firebase from '../Component/FirebaseConfiguration/firebase';
import Button from '../Component/Button';
import Spinner from 'react-bootstrap/Spinner'

function Helper(props) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    window.addEventListener('load', () => {
        getHelperData();
      });

    const getHelperData = async() => {
        setIsLoading(true) ;   
        await firebase.firestore().collection('Helpers').get().then((docs)=>{
            if (docs.empty) {
                console.log('No matching documents.');
                setIsLoading(false) 
                return;
            }  
            setUsers([])
            docs.forEach(doc => {
                var data = doc.data();
                setUsers(arr => [...arr , data]);
            });
            setIsLoading(false)
        })
        setIsLoading(false)
    }

    const refreshPage = () =>  {
        window.location.reload(false);
    }

    return (
        <div className='inline float-left'>
            <div className='row'>
                <SideBar title="Helper" />
                <div className='col-lg-9'>
                    <div className='row'>
                        <div className='col-lg-6 mt-4 mb-2' >
                            <h1 className='d-none d-lg-block'> Helper</h1>
                        </div>
                        <div className='col-lg-6 col-sm-12 col-xsm-12  mt-4'>
                            <Search />
                        </div>
                    </div>
                    <div className='row pe-5'>
                        <div className='col-lg-12'>
                            <NavLink style={{float:'left', }} className='me-2 ms-2' exact to="/AddNewHelper">
                                <Button title="Add Helper" className="btn btn-primary" />
                            </NavLink>
                            <div>                           
                                <Button onClick={refreshPage} title="Refresh" className="btn btn-primary" />
                            </div>
                            
                        </div>
                    </div>
                    <div className='row'>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Skills</th>
                                        <th scope="col">Star</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {isLoading ? "" : users.map((data, i) => (
                                    <tr>
                                        <th scope="row">{i=i+1}</th>
                                        <td>{data.fullName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.Address}</td>
                                        <td>{data.skills}</td>
                                        <td>{data.star}</td>
                                        <td>{data.phone}</td>
                                        <td>
                                            <Link exact to={"/HelperDetails/"+ data.id }>Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {isLoading ? <p style={{textAlign:"center"}}><Spinner animation="border" variant="dark"/></p> : ""}
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    );
}

export default Helper;