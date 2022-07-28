import React, { useEffect, useState } from 'react';

import Search from '../Component/Search';
import Button from '../Component/Button';
import SideBar from '../Component/SideBar';

import 'cdbreact';
import Spinner from 'react-bootstrap/Spinner'
import { NavLink, Link } from 'react-router-dom';
import firebase from '../Component/FirebaseConfiguration/firebase';

function Customer(props) {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [contactsData, setContactsData] = useState(users)//iterate this in table

    window.addEventListener('load', async() => {
        await GetProfData();
    },[]);

    const GetProfData = async() => {
        setIsLoading(true);
        await firebase.firestore().collection('Users').get().then((docs)=>{
            if (docs.empty) {
                console.log('No matching documents.');
                setIsLoading(false)
            }
                setUsers([])
                docs.forEach(doc => {
                    var data = doc.data();
                    setUsers(arr => [...arr , data]);
                });
                setIsLoading(false);
        })
        setIsLoading(false); 
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    const handleSearch = (val) => {
        setSearch(val)
        if(val!=''){
            setContactsData(users.filter(contact => {
                contact.fullName.includes(val) ||
                contact.email.includes(val)
            }))
        }
        else{
            setContactsData(users)
        }
    }
 
    return (
        <div className='container-fulid p-0'>
            <div className='row'>
                <SideBar title="Customer" />
                <div className='col-lg-9'>
                    <div className='row'>
                        <div className='col-lg-6 mt-4 mb-2' >
                            <h1 className='d-none d-lg-block'> Customer</h1>
                        </div>
                        <div className='col-lg-6 col-sm-12 col-xs-12 mt-4'>
                            <Search onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className='row pe-5'>
                        <div className='col-lg-12'>
                            <NavLink style={{float:'left', }} className='me-2 ms-2' exact to="/AddNewCustomer">
                                <Button title="Add User" className="btn btn-primary" />
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
                                        <th scope="col">Phone</th>
                                        {/* <th scope="col">Image</th> */}
                                        <th scope="col">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {isLoading ? "" : users.map((data,i) => (
                                    <tr>
                                        <th scope="row">{i = i + 1}</th>
                                        <td>{data.fullName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.Address}</td>
                                        <td>{data.phone}</td>
                                        {/* <td>
                                            <image src={data.images} className="rounded" width={50} alt="Some image"/>
                                        </td> */}
                                        <td>
                                            <Link exact to={"/CustomerDetails/"+ data.id }>Edit</Link>
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

export default Customer;