import React from 'react';
import { Link } from 'react-router-dom';

const SignedOut = (props) => {
    return (
        <>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/signup'}>Signup</Link></li>
        </>
    );
};
 
export default SignedOut;