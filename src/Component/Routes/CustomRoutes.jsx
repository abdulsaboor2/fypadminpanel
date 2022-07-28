import React, {useEffect, useState} from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import firebase from '../FirebaseConfiguration/firebase';

import Login from '../../Pages/Login';
import Dashboard from '../../Pages/Dashboard';
import Customer from '../../Pages/Customer';
import Helper from '../../Pages/Helper';
import Error404 from '../../Pages/Error404';
import Complaint from '../../Pages/Complaint';
import CustomerDetails from '../../Pages/CustomerDetails';
import HelperDetails from '../../Pages/HelperDetails';
import Feedback from '../../Pages/Feedback';
import AddNewCustomer from '../../Pages/AddNewCustomer';
import AddNewHelper from '../../Pages/AddNewHelper';
import FeedbackDetails from '../../Pages/FeedbackDetails';
import ComplaintDetails from '../../Pages/ComplaintDetails';

function CustomRoutes(props) {
  var user = firebase.auth().currentUser;
  const [token, setToken] = useState();
  
  useEffect(()=>{
    setToken(localStorage.getItem('token'));
  }, [])

  return (
    <Router>
      <Routes>
      {(token || user) ?
        <>
          <Route replace exact path="/Dashboard" element={<Dashboard />} />
          <Route path='*' exact={true} element={<Error404 />} />
          <Route replace exact path="/Customer" element={<Customer />} />
          <Route replace exact path="/AddNewCustomer" element={<AddNewCustomer />} />
          <Route exact path="/CustomerDetails/:ids" element={<CustomerDetails />} />
          <Route replace exact path="/Helper" element={<Helper />} />
          <Route exact path="/AddNewHelper" element={<AddNewHelper />} />
          <Route exact path="/HelperDetails/:ids" element={<HelperDetails />} />
          <Route replace exact path="/Feedback" element={<Feedback />} />
          <Route exact path="/FeedbackDetails/:ids" element={<FeedbackDetails />} />
          <Route replace exact path="/Complain" element={<Complaint />} />
          <Route exact path="/ComplainDetails/:ids" element={<ComplaintDetails />} />
          <Route replace exact path="/" element={<Dashboard />} />
        </>
        :
        <>
          <Route replace path='*' exact={true} element={<Login />} />
        </> 
      }
      </Routes>
    </Router>
  );
}

export default CustomRoutes;