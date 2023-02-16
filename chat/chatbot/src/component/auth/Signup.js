import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import {Navigate } from 'react-router-dom'

const Signup = () => {
    const {setUser, user} = useContext(UserContext);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const signupSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/signup',{
            credentials:'include',
            method:"POST",
            body: JSON.stringify({name, email, password}),
            headers: {'Content-type': 'application/json'}
        }).then((result) => result.json()).then((data) => {
            console.log("Sign Up Data "+data);
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
                        <input placeholder="Name Id" id="name" name="name" type="text" className="validate" onChange={e => setName(e.target.value)}/>
                        <label htmlFor="name">Name</label>
                        </div>       
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input placeholder="Email Id" id="email" name="email" type="text" className="validate" onChange={e => setEmail(e.target.value)}/>
                        <label htmlFor="email">email</label>
                        </div>       
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input placeholder="password" id="password" name="password" type="password" className="validate" onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        </div>       
                    </div>
                    <button className="waves-effect waves-light btn" onClick={signupSubmit}>SignUp</button>                       
                </form>
            </div>    
        </div>
    );
};

 

export default Signup;