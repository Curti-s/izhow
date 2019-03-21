import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class RoomList extends Component {

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    }

    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this);
        if(this.shouldScrollBottom) {
            node.scrollTop = node.scrollHeight;
        }
    }

    render() {
        const orderedRooms = this.props.rooms.sort((a,b) => a.id - b.id);
        return (
            <div className="rooms-list">
                <ul>
                    <h3>Your rooms:</h3>
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