import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { URL } from '../../config';
import { UserContext } from '../../UserContext';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client';
import Messages from './Messages';

let socket;
 
const Chat = () => {
    const ENDPT = URL;
    const {user} = useContext(UserContext);
    const [message, setMessage] = useState(null);
    const [messages,setMessages] = useState([]);
    let {room_id} = useParams();
     
    useEffect(() => {
        socket = io(ENDPT);        
        socket.emit('join', {room_id,user_id:user?._id,name:user?.name});
    }, [room_id]);

    useEffect(() => {
        console.log("Ussse Effect for receve message To client fro server");
        socket.on('message',(message) => {
            setMessages([...messages,message]);
        })
    },[messages])

    const sendMessage = (e) => {
        e.preventDefault();
        if(message){
            socket.emit('sendmessage', message, room_id,user._id, () => {
                setMessage('');
                console.log("Call Back executed");
            })
        }        
    }
     
    if(!user) {
        return <Navigate to={'/login'} />
    }
    return (
        <div className='container'>
            {/* <div>{room_id}, {room_name}</div> */}
           <h4>Hello {user.name ? user.name : ''}</h4>
           {/* <pre>{JSON.stringify(messages, null, '\t')}</pre> */}
           <Messages messages={messages}/> 
           <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                        <input placeholder="Chat" id="chat" name="chat" type="text" className="validate" value={message?message:''} onChange={e => setMessage(e.target.value)}/>
                        <label htmlFor="chat">Chat</label>
                        </div>       
                    </div>
                    <button className="waves-effect waves-light btn" onClick={sendMessage}>Submit</button>                       
                </form>
            </div>
           <Link to= {'/'} >
                <button className="waves-effect waves-light btn">Go to Home</button>
            </Link>
        </div>
    );
};

export default Chat;