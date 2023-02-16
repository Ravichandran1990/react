import React, { useContext, useEffect, useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import { URL } from '../../config';
import { UserContext } from '../../UserContext';
import RoomList from './RoomList';
import io from 'socket.io-client';
let socket;// = socketIO.connect('http://localhost:5000');
 
const Home = () => {
    const {user} = useContext(UserContext);
    const [room, setRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [errorRoom, setErrorRoom] = useState(null);
    const ENDPT = URL;
    
    useEffect(() => {
        socket = io(ENDPT);
        console.log(socket);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPT]);
     
    useEffect(() => {
        socket.on('roomList', (list) => {
            setRooms([...rooms,...list])
        })
    }, [rooms])
    useEffect(() => {
        socket.on("roomCreated", (room) => {
            console.log("Rooms ", room);
            setRooms([...rooms,room]);
        })
    }, [rooms])
         
    const createRoom = (e) => {
        e.preventDefault();
        const checkRoom = rooms.find((roomData) => roomData.name === room);
        if(!checkRoom){
            socket.emit('createRoom', room); 
        }else {
            setErrorRoom("Room already created create different room")
        }       
        setRoom('');
    }
    if(!user) {
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                        <span className="card-title">Welcome {user? user.name: ''}</span>
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                    <input placeholder="Room" id="room" name="room" type="text" value={room ? room : ''} onKeyDown={e => setErrorRoom('')} className="validate" onChange={e => setRoom(e.target.value)}/>
                                    <div className="name error red-text">
                                       {errorRoom}
                                    </div>
                                    <label htmlFor="room">Room Name</label>
                                    </div>       
                                </div>
                                <button className="waves-effect waves-light btn" onClick={createRoom}>Create Room</button>                       
                            </form>
                        </div>
                        </div>
                        
                    </div>
                </div>
                <div className="col s12 m6">
                    <RoomList rooms={rooms}/>
                </div>
            </div>            
            <Link to= {'/chat'}>
                <button className="waves-effect waves-light btn">Go to Chat</button>
            </Link>

        </div>
    );
};

export default Home;