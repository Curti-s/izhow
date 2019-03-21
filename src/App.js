import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';

import './App.css';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import NewRoomForm from './NewRoomForm';
import RoomList from './RoomList';

import {tokenUrl, instanceLocator} from './config';


class App extends Component {

  constructor(props) {
    super(props);
    this.state =  {
      messages: [],
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    let chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: 'curtis',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              this.setState({
                messages:[...this.state.messages, message]})
            }
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.currentUser.rooms[0].id
    });
  }

  render() {

    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
