import React, { useEffect } from 'react';

import Cards from '../Component/Cards';
import SideBar from '../Component/SideBar';

import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
    const navigate = useNavigate();

    let userToken;
    useEffect(() => {
        GettingLocalData()
    }, []);
    
    const GettingLocalData = async() => {
        userToken = await localStorage.getItem('token');
        if(!userToken){
            navigate("/")
        }
    }
  
    return (
        <div className='container-fluid ps-0 peMobil'>
            <div className='row'>
                <SideBar title="Dashboard" />
                <div className='col-lg-9'>
                    <div className='col-lg-6 mt-3 mb-2'>
                        <h1 className='d-none d-lg-block'> Dashboard </h1>
                    </div>
                    <div className='row handleMargin'> 
                        <Cards className={"card text-white mb-3 bg-dark"} title={"Yearly Earning"} earned={"200000 Rs."} />
                        <Cards className={"card text-white mb-3 bg-primary"} title={"Monthly Earning"} earned={"40000 Rs."}/>
                        <Cards className={"card text-white mb-3 bg-secondary"} title={"Weekly Earning"} earned={"20000 Rs."} />
                        <Cards className={"card text-white mb-3 bg-success"} title={"Yesterday Earning"} earned={"200000 Rs."} />
                        <Cards className={"card text-white mb-3 bg-danger"} title={"All Time Buy Services"} earned={"5000 Person"} />
                        <Cards className={"card text-white mb-3 bg-warning"} title={"Today Sales"} earned={"100 Person"} />
                    </div>  
                </div>
            </div>
        </div> 
    );
}

export default Dashboard;