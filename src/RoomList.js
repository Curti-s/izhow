import React, { Component } from 'react';

class RoomList extends Component {

    render() {
        return (
            <div className="rooms-list">
                <ul>
                    <h1>Your rooms</h1>
                    {this.props.rooms.map((room, index) => {
                        return (
                            <li 
                                key={room.id}
                                className="room" >
                                <a href="/">{room.name}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList;