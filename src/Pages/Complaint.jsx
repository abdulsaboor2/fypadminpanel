import React, {useState} from 'react';

import Search from '../Component/Search';
import SideBar from '../Component/SideBar';
import Button from '../Component/Button';

import{Link} from 'react-router-dom'
import firebase from '../Component/FirebaseConfiguration/firebase'
import Spinner from 'react-bootstrap/Spinner'

function Complaint(props) {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    window.addEventListener('load', () => {
        getFeedbackData();
      });

    const getFeedbackData = async() => {   
        setIsLoading(true); 
        await firebase.firestore().collection('Complain').get().then((docs)=>{
            if (docs.empty) {
                console.log('No matching documents.');
                setIsLoading(false);
                return;
            } setUsers([])
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

    return (
        <div className='container-fluid p-0'>
            <div className='row'>
                <SideBar title="Complain" />
                <div className='col-lg-9'>
                    <div className='row'>
                        <div className='col-lg-6 mt-4 mb-2' >
                            <h1 className='d-none d-lg-block'> Complain</h1>
                        </div>
                        <div className='col-lg-6 col-sm-12 col-xsm-12  mt-4'>
                            <Search />
                        </div>
                    </div>
                    <div className='row pe-5'>
                        <div>
                            <Button title="Refresh" onClick={refreshPage} className="btn btn-primary"/>
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
                                        <th scope="col">Status</th>
                                        <th scope="col">Complain</th>
                                        <th scope="col">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {isLoading ? "" : users.map((data, i) => (
                                    <tr>
                                        <th scope="row">{i=i+1}</th>
                                        <td>{data.fullName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.status}</td>
                                        <td>{data.message}</td>
                                        <td> 
                                            <Link exact to={"/ComplainDetails/" + data.id}>Response</Link>
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

export default Complaint;