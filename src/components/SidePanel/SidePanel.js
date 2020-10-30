import React from 'react';
import firebase from '../../firebase';
import './SidePanel.css';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import {
  Link,
} from "react-router-dom";

import { RiArrowRightSLine } from 'react-icons/ri';

function Nav(props) {
  const channelsRef = firebase.firestore().collection(`channels`);
  const query = channelsRef.orderBy('id', 'asc');

  const [channels] = useCollectionData(query);

  const handleClick = () => {
    if(props.mobile){
      props.onClick()
    }
  }
    
  return (
    <div className="Nav">
      <div className={"side-panel-close-btn"}>
        <RiArrowRightSLine onClick={props.onClick} style={{ marginLeft: 'auto' }} size={'3vh'} />
      </div>
      {props.user && <div className="User">
        <img className="UserImage" alt="whatever" src={props.user.photoUrl} />
        <div style={{textAlign: 'left'}}>
          <div>{props.user.displayName}</div>
          <div>
            <button
              className="text-button"
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      }
      <nav className="ChannelNav">
        <ul>
          {channels && channels.map((channel)=>{
            return(<li key={channel.id}>
              <Link to={`/${channel.name}`} onClick={handleClick}># {channel.name}</Link>
            </li>)
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;