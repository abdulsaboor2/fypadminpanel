import React from 'react';

import { NavLink } from 'react-router-dom';
import Button from '../Component/Button';

function Error404(props) {
    return (
        <div style={{textAlign: 'Center', marginTop: '15%'}}>
            <h3 style={{color:"red"}}>Page Not Found !! Request 404 Error</h3>    
            <NavLink className='btn btn-primary' to="/Dashboard">Go To Home</NavLink>
        </div>
    );
}

export default Error404;