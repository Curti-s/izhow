import React, { Component } from 'react';

class NewRoomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({roomName: e.target.value})
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.createRoom(this.state.roomName);
        this.setState({roomName: ''});
    }
    render() {
        return (
            <div className="new-room-form">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={this.state.roomName}
                        onChange={this.handleChange}
                        placeholder="Create new room"
                        type='text'
                        required
                    />
                </form>
            </div>
        )
    }
}

export default NewRoomForm;