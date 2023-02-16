import React from 'react';

const Room = ({room}) => {
    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card">                     
                    <div className="card-content">
                    
                        <p>{room}</p>
                    
                    </div>                     
                </div>
            </div>
        </div>
    );
};

export default Room;