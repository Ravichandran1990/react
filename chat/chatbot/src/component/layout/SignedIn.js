import React from 'react';
 

const SignedIn = ({logout}) => {
    return (
        <>
        <li onClick={logout}><a href="#!">Logout</a></li> 
        </>
    );
};
 
export default SignedIn;