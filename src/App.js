import React, { Component } from 'react';
import './App.css';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import NewRoomForm from './NewRoomForm';
import RoomList from './RoomList';

class App extends Component {
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
