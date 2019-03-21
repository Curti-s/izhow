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
    render() {
        return (
            <div className="message-list">
                {DUMMY_DATA.map((message, index) => {
                    return (
                        <div 
                            key={index} 
                            className="message">
                            <div className="message-username">
                              {message.senderId}
                            </div> 
                            <div className="message-text">
                                {message.text}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default MessageList;