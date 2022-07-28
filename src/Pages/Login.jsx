import React, { useState} from 'react';

import Button from '../Component/Button';

import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom';
import firebase from '../Component/FirebaseConfiguration/firebase';

function Login(props) {
    const [email, setUname] = useState("");
    const [pass, setPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() => {
        setIsLoading(true);
        if(!email && !pass){
            setErrorMessage("Email And Password is required");
            setIsLoading(false);
        }
        else if(!email){
            setErrorMessage("Email is required");
            setIsLoading(false);
        }
        else if(!pass){
            setErrorMessage("Password is required");
            setIsLoading(false)
        }
        else{
            try {  
               await firebase.auth().signInWithEmailAndPassword(email, pass).then((response)=>{
                const uid = response.user.uid;
                firebase.firestore().collection("Admin").doc(uid).get().then((firestoreDocument) => {
                if (!firestoreDocument.exists) {
                  alert("User does not exist anymore.");
                  setIsLoading(false)
                } else {
                    localStorage.setItem('token', uid);
                    navigate("/Dashboard");
                    refreshPage();
                }
              })
              .catch((error) => {
                alert(error.toString());
                setIsLoading(false)
              });
          })
          .catch((error) => {
            alert(error.toString());
            setIsLoading(false)
          });  
            } 
            catch (err) {
                alert(err.message)
                setIsLoading(false)
            }
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    const handleLoading = () => {
        return (isLoading ? <Spinner animation="border" size="sm" variant="dark" /> : "Login" );
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-xs-12 col-sm-12'>
                            <form className='form' onSubmit={handleSubmit} >
                                <h3>Login</h3>
                                <div className="mb-3">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={email} 
                                        onChange={(e) => setUname(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={pass} 
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                </div>
                                <p className='text-danger'>{errorMessage}</p>
                                <div className="d-grid">
                                    <Button className="btn btn-primary" title={handleLoading()} onClick={handleLogin}/>  
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;