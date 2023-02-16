import React, {useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../UserContext';
import Message from './Message';
const Messages = ({messages}) => {
    const {user} = useContext(UserContext);
    const chatContainerRef = useRef();
    useEffect(() => {
        if(chatContainerRef.current.scrollHeight > chatContainerRef.current.clientHeight) {
            chatContainerRef.current.scrollTo(0, (chatContainerRef.current.scrollHeight - 10));
        }
    })
    return (
        <div className="messagesContainer">
            <ul id="chatContainer" className='scrollContainer' ref={chatContainerRef}>
             {messages && messages.map((message) => user._id === message.user_id ?(                 
                    <Message key={message._id} message={message} align='self'/>                
            ) : <Message key={message._id} message={message} align='other'/>)}
            </ul>
        </div>
    );
};

export default Messages;