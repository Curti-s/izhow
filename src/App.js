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
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    let chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: 'wikkie',
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

  createRoom(roomName) {
    this.currentUser.createRoom({
      name: roomName
    })
    .then(room => {
      this.subscribeToRoom(room.id);
    })
    .catch(err => { console.log(`Error occurred ${err}`)})
  }

  render() {

    return (
      <div className="app">
        <RoomList 
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList
          roomId={this.state.roomId} 
          messages={this.state.messages} />
        <SendMessageForm
          disabled={!this.state.roomId} 
          sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
