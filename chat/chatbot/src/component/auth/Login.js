import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import {Navigate } from 'react-router-dom';
import { URL } from '../../config';
const Login = () => {
    const {user,setUser} = useContext(UserContext);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const loginSubmit = (e) => {
        e.preventDefault();
        e.preventDefault();
        fetch(URL+'login', {
            credentials:'include',
            method:"POST",
            body: JSON.stringify({email, password}),
            headers: {'Content-type': 'application/json'}
        }).then((result) => result.json()).then((data) => {
            console.log("Login Data "+data);
            if(data.error === "Incorrect Password"){
                setErrorPassword(data.error);
            }
            setUser(data.user);
            // window.location.href = '/';
        }).catch((error) => {
            console.log(error);
        });        
    }
    if(user) {
        return <Navigate to={'/'} />
    }
    return (
        <div className='container'>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                        <input placeholder="Email Id" id="email" name="email" type="text" className="validate" onChange={e => setEmail(e.target.value)}/>
                        <div className="name error red-text">
                            Invalid Email
                        </div>
                        <label htmlFor="email">email</label>
                        </div>       
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input placeholder="password" id="password" name="password" type="password" className="validate" onChange={e => setPassword(e.target.value)}/>
                        <div className="name error red-text">
                            {errorPassword}
                        </div>   
                        <label htmlFor="password">Password</label>
                        </div>       
                    </div>
                    <button className="waves-effect waves-light btn" onClick={loginSubmit}>Login</button>                       
                </form>
            </div>    
        </div>
    );
};
 
export default Login;