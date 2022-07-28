import React, {useState, useEffect} from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Collapse } from "bootstrap";
import firebase from "./FirebaseConfiguration/firebase";
import Spinner from 'react-bootstrap/Spinner'

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

const SideBar = (props) => {
    var [toggle, setToggle] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        var myCollapse = document.getElementById('collapseTarget')
        var bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide();

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
    });

    const logout = async() =>{
        await firebase.auth().signOut();    
        localStorage.removeItem('token')
        localStorage.removeItem('CID')
        refreshPage();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className='col-lg-3 col-md-3 col-xm-12 col-xm-12'>
            <h1 className="d-block d-sm-none d-md-none h-loc" style={{position:"absolute", top: 5, left: 40, zIndex:-1}}>{props.title}</h1>
            <button className="btn btn-dark btn-loc d-block d-sm-none d-block d-md-none"
                onClick={() => setToggle(toggle => !toggle)}>
                <i style={{fontSize: 18}} className="fas fa-bars"></i>
            </button>
        
             <div className={window.innerWidth <= 500 ? "collapse" : "collapse-in"} id="collapseTarget">
                 <div id="sidebar-wrapper" >
                     <ul className="sidebar-nav">
                         <li class="sidebar-brand">
                             <NavLink exact to="/">Admin Pannel</NavLink> 
                         </li>
                         <li>
                             <NavLink exact to="/Dashboard">
                                 <i className="fas fa-tachometer-alt">  Dashboard</i>
                             </NavLink>
                         </li>
                         <li>
                             <a href="/Customer">
                                <i className="fas fa-users"> Customers</i>
                             </a>
                             
                         </li>
                         <li>
                             <a href="/Helper">
                                 <i className="fas fa-people-carry"> Helpers  </i>
                             </a>
                         </li>
                         <li>
                             <a href="/Feedback">
                                 <i className="far fa-comment-dots" style={{fontWeight:"bold"}}> Feedback </i>
                             </a>
                         </li>
                         <li>
                             <a href="/Complain">
                                 <i className="fas fa-question-circle"> Complaint</i>
                             </a>
                         </li>
                         <li className="sidebarBottom">
                            <NavLink replace exact to="/">
                                <i className="fas fa-sign-out-alt" onClick={logout}> Logout</i>
                            </NavLink>
                         </li> 
                     </ul>
                 </div>
             </div>
         </div>
       
    );
}

export default SideBar;
