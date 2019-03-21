import React, { Component } from 'react';
import Message from './Message';


const DUMMY_DATA =  [
    {
        "senderId": "Curtis",
        "text": "Sasa mama",
    },
    {
        "senderId": "Babe",
        "text": "Hey there boujie",
    },
    {
        "senderId": "Curtis",
        "text": "STFU",
    }
]
class MessageList extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message 
                            key={index} 
                            username={message.senderId}
                            text={message.text} />
                    )
                })}
            </div>
        );
    }
}

export default MessageList;