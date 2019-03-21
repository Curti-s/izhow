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
      joinableRooms: [],
      joinedRooms: [],
      roomId: null,
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
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

        this.getRooms();
      })
      .catch(error => {
        console.log('Error on connecting ...' + error);
      })
  }

  subscribeToRoom(roomId) {
    this.setState({messages: []})
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages:[...this.state.messages, message]})
        }
      }
    })
    .then(room => {
      this.setState({roomId: room.id})
      this.getRooms();
    })
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
          .then(joinableRooms => {
            this.setState({
              joinableRooms:joinableRooms,
              joinedRooms: this.currentUser.rooms
            })
          })
          .catch(error => {
            console.log('Error on joinable rooms ...' + error);
          })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  render() {

    return (
      <div className="app">
        <RoomList 
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
