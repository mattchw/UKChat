import React, { useRef, useState } from 'react';
import firebase from '../../firebase';
import './ChatRoom.css';

import {
  useParams,
} from "react-router-dom";

import { RiArrowLeftSLine } from 'react-icons/ri';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatMessage from '../ChatMessage/ChatMessage';

function ChatRoom(props) {
  let { id } = useParams();
  const end = useRef();
  const messagesRef = firebase.firestore().collection(`channels/${id}/messages`);
  const query = messagesRef.orderBy('createdAt', 'desc');

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const shouldShowDay = (next, current) => {
    if (!next) {
      return true;
    }
    if (new Date(current.createdAt.seconds * 1000).toLocaleDateString() !== new Date(next.createdAt.seconds * 1000).toLocaleDateString())
      return true;
    else
      return false;
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (formValue !== '') {
      const { uid, displayName, photoURL } = firebase.auth().currentUser;

      const time = await firebase.firestore.FieldValue.serverTimestamp();

      await messagesRef.add({
        text: formValue,
        createdAt: time,
        uid,
        displayName,
        photoURL
      })

      setFormValue('');
      end.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (<React.Fragment>
    <div className="chat-wrapper">
      <div className="chat-header">
        <div style={{margin: 'auto 0', padding: '0 10px'}}>
          <RiArrowLeftSLine className={props.showLeft ? "hide" : ""} onClick={props.onClick} size={'3vh'} />
        </div>
        <div style={{margin: 'auto 0', padding: '0 5px'}}>
          <h5 style={{ marginBottom: 0 }}># {id}</h5>
        </div>
      </div>
      <div id="chat-body"className="chat-body">
        <span ref={end}></span>
        
        {messages && messages.map((msg, index) => {
          const next = messages[index + 1];
          
          return(<React.Fragment key={msg.id}>
            <ChatMessage message={msg} />
            {msg && msg.createdAt && shouldShowDay(next, msg) && (<div className="date">
              <p>{new Date(msg.createdAt.seconds * 1000).toLocaleDateString()}</p>
            </div>
            )}
            </React.Fragment>)
        })}
      </div>
      <div className="chat-footer">
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message..." />

        </form>
      </div>
    </div>
  </React.Fragment>)
}
export default ChatRoom;