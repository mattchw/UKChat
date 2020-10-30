import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import firebase from './firebase';

// components
import Login from './layout/Login';
import Logined from './layout/Logined';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        setUser(user);

        firebase.firestore().collection('users')
          .doc(user.uid)
          .set(user, { merge: true });

      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};


function App() {
  const user = useAuth();

  return (<div className="App">
    {user ? (
      <Logined user={user} />
    ) : (
      <Login />
    )}
  </div>
  )
}

export default App;
