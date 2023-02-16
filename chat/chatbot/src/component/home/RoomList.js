import React from 'react';
import { Link } from 'react-router-dom';
import Room from './Room';
const RoomList = ({rooms}) => {
    console.log("Room List "+rooms);
    return (
        <div className='roomList scrollContainer'>
            
                {rooms && rooms.map((room) => (
                <Link to= {'/chat/'+room.name+'/'+room._id} key={room._id}>
                    <Room key={room._id} room={room.name}/>
                </Link>    
                ))}
            
        </div>
    );
};

export default RoomList;