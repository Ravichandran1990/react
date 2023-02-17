import React  from 'react';
import { getDay } from '../models/getDay';
 
const Message = ({message,align}) => {    
    // console.log(message);
    return (
        <>
        <li className={align === 'self'? 'me' : 'you'}>
            <div className="entete">
            <h3>{new Date(message.updatedAt).toLocaleTimeString()} {getDay(message.updatedAt)}</h3>
            <h2>{align === 'self'? 'you' : message.name}</h2>
            <span className={`status ${align === 'self' ? 'blue' : 'green'}`}></span>
            </div>
            <div className="triangle"></div>
            <div className="message">
                {message.text}
            </div>
        </li>          
        </>
    );
};

export default Message;