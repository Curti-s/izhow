import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';

import './App.css';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import NewRoomForm from './NewRoomForm';
import RoomList from './RoomList';

import {tokenUrl, instanceLocator} from './config';


class App extends Component {

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
        currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              console.log("Message received: " + message);
            }
          }
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
