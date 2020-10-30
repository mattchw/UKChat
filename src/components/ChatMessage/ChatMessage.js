import React from 'react';
import firebase from '../../firebase';

function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message;

  const messageClass = uid === firebase.auth().currentUser.uid ? 'sent' : 'received';

  return (<React.Fragment>
    <div className={`message ${messageClass}`}>
      <img className={`${messageClass==='received' ? 'show' : 'hide'}`} alt={uid} src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} style={{width: 35, height: 'auto'}}/>
      <p>{text}</p>
      {createdAt && <p id="timestamp">{new Date(createdAt.seconds*1000).getHours()+":"+("0"+new Date(createdAt.seconds*1000).getMinutes()).substr(-2)}</p>}
    </div>
  </React.Fragment>)
}
export default ChatMessage;