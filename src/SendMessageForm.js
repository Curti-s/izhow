import React, { Component } from 'react';

class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        /* send message */
        this.props.sendMessage(this.state.message)
        this.setState({message: ''})
    }

    render() {
        return (
            <form 
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input 
                    type="text"
                    placeholder="Type your message and hit ENTER"
                    value={this.state.message}
                    onChange={this.handleChange} />
            </form>
        )
    }
}

export default SendMessageForm;