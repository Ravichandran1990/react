import React, {useContext} from 'react';
import { UserContext } from '../../UserContext';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';


const NavBar = ({setUserNull}) => {
    const {user} = useContext(UserContext);   
    const logout = async (e) => {
        e.preventDefault();
        try{
            const result = await fetch('http://localhost:5000/logout', {
            credentials:'include'             
            });
            await result.json();         
            setUserNull(null);                
        }catch(error) {
            console.log(error);
        }
    }
   const menu = user ? <SignedIn logout={logout}/> : <SignedOut />
    return (
        <>
        <nav className='green'>
            <div className="nav-wrapper">
            <a href="/" className="brand-logo">ChatBoat</a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">                
                 {menu}             
            </ul>
            </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">                
             {menu}   
        </ul>
        </>
    );
};

export default NavBar;