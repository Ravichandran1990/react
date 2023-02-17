import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { URL } from '../../config';
import { UserContext } from '../../UserContext';

import io from 'socket.io-client';
import Messages from './Messages';

let socket;
 
const Chat = () => {
    const ENDPT = URL;
    const { transcript, resetTranscript } = useSpeechRecognition();
    const {user} = useContext(UserContext);
    const [message, setMessage] = useState(null);
    const [messages,setMessages] = useState([]);
    let {room_id} = useParams();
    const requestJoin = JSON.stringify({room_id,user_id:user?._id,name:user?.name});
    useEffect(() => {
        socket = io(ENDPT);
        console.log("Chat Socket Connetcion "+socket);
        return () => {             
            socket.emit('disconnect');
           socket.off();
        }
    }, [ENDPT]);
    useEffect(() => { 
        const join = () => {
            socket.emit('join', requestJoin);
        }               
        join();
    }, [requestJoin]);

    useEffect(() => {
        socket.on('message',(message) => {
            console.log("Ussse Effect message received from server To client");
            setMessages([...messages,message]);
        })
    },[messages])

    const startSpeechChat = () => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            alert("Your browser not supported speech recognition!")
            return;
        }
        setMessage("Listening...");
        SpeechRecognition.startListening({
            continuous: true,
        });
    };

    const sendEmitMessage = (message) => {
        if(message){
            socket.emit('sendmessage', message, room_id,user._id, () => {
                setMessage('');
                resetTranscript();
                console.log("Call Back executed");
            })
        } 
    }

    const sendMessage = (e) => {
        e.preventDefault();
        sendEmitMessage(message);       
    }   

    const stopSpeechChat = () => {            
        SpeechRecognition.stopListening();
        console.log(transcript);
        sendEmitMessage(transcript);
        
    };
     
    if(!user) {
        return <Navigate to={'/login'} />
    }
    return (
        <div className='container'>
                     
           <h4>Hello {user.name ? user.name : ''}</h4>
           {/* <pre>{JSON.stringify(messages, null, '\t')}</pre> */}
           <Messages messages={messages}/> 
           <div className="row chatText">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                        <input placeholder="Chat" autoFocus id="chat" name="chat" type="text" className="validate" value={message?message:''} onChange={e => setMessage(e.target.value)}/>
                        <label htmlFor="chat">Chat</label>
                        </div>       
                    </div>
                    <button className="waves-effect waves-light btn" onClick={sendMessage}>Submit</button>                                          
                </form>
                <button className="microPhone waves-effect waves-light btn" onMouseDown={ startSpeechChat } onMouseUp={ stopSpeechChat }><i className="material-icons">mic_none</i></button> 
            </div>
           <Link to= {'/'} >
                <button className="waves-effect waves-light btn">Go to Home</button>
            </Link>
        </div>
    );
};

export default Chat;