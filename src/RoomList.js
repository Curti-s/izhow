import React, { Component } from 'react';

class RoomList extends Component {

    render() {
        const orderedRooms = this.props.rooms.sort((a,b) => a.id - b.id);
        return (
            <div className="rooms-list">
                <ul>
                    <h1>Your rooms</h1>
                    {orderedRooms.map((room, index) => {
                        const active = this.props.roomId === room.id ? "active" : "";
                        return (
                            <li 
                                key={room.id}
                                className={"room " + active} >
                                <button 
                                    className="btn btn-room"
                                    onClick={() => this.props.subscribeToRoom(room.id)}>
                                    #{room.name}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList;