import React, {useState} from 'react';

import Search from '../Component/Search';
import SideBar from '../Component/SideBar';
import {Link} from 'react-router-dom';
import firebase from '../Component/FirebaseConfiguration/firebase';
import Button from '../Component/Button';
import Spinner from 'react-bootstrap/Spinner'

function Feedback(props) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    window.addEventListener('load', () => {
        getFeedbackData();
      });

    const getFeedbackData = async() => {    
        setIsLoading(true);
        await firebase.firestore().collection('Feedbacks').get().then((docs)=>{
            if (docs.empty) {
                console.log('No matching documents.');
                setIsLoading(false);
                return;
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

    return (
        <div className='container-fluid p-0'>
        <div className='row'>
            <SideBar title="Feedback"/>
            <div className='col-lg-9'>
                <div className='row'>
                    <div className='col-lg-6 mt-4 mb-2' >
                        <h1 className='d-none d-lg-block'> Feedback</h1>
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
                                <th scope="col">Comment</th>
                                <th scope="col">Stars</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        {isLoading ? "" : users.map((data, i) => (
                            <tr>{localStorage.setItem('CID', data.customerId)}
                                <th scope="row">{i=i+1}</th>
                                <td>{data.comment}</td>
                                <td>{data.star}</td>
                                <td>
                                    <Link exact to={"/FeedbackDetails/"+ data.HelperId}>View</Link>
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

export default Feedback;