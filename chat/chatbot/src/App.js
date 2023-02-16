 
import './App.css';
import React, { useState, useEffect } from 'react';
import { URL } from './config';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './UserContext';
import NavBar from './component/layout/NavBar'; 
import Home from './component/home/Home'; 
import Chat from './component/chat/Chat';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import io from 'socket.io-client';
// = socketIO.connect('http://localhost:5000');
function App() {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const ENDPT = URL;    
    useEffect(() => {
        const socket = io(ENDPT);
        setSocket(socket);
        console.log(socket);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPT]);
    useEffect(() => {
      const verifyUser = async () => {
        try {
          const result =await fetch(URL+'verifyuser', {
            credentials:'include',             
            //headers: {'Content-type': 'application/json'}
        })
        const data = await result.json();             
        setUser(data.user);
        } catch(error) {
          console.log(error);
        }         
      }
      verifyUser();
    }, [])
    const setUserNull = (data) => {
      setUser(data);
    }
    

  return (
    
    <Router>
        <div className="App">
          <NavBar setUserNull={setUserNull} userData={user}/>
          <UserContext.Provider value={{user, setUser, socket, setSocket}}>
             <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/chat/:room_name/:room_id" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
             </Routes>
          </UserContext.Provider>
        </div>
    </Router>
              
  );
}

export default App;
