import React from 'react';
import firebase from '../../firebase';

import Card from 'react-bootstrap/Card'

function Login() {

  const signInWithGoogle = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(googleProvider);
    } catch (error) {
      console.log(error);
    }
  }

  const signInWithFacebook = async () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    try {
      await firebase.auth().signInWithPopup(facebookProvider);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Card className="LoginCard" style={{ width: '18rem', padding: 20 }}>
        <Card.Body>
          <Card.Title>Welcome to UKChat</Card.Title>
          <Card.Subtitle style={{paddingBottom: 10}} className="mb-2 text-muted">The UK chatroom for HKers</Card.Subtitle>

          <Card.Link style={{margin: 'auto 0'}} onClick={signInWithGoogle}><img src="https://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg" alt="google" />Login with Google</Card.Link>
          <Card.Link style={{margin: 'auto 0'}} onClick={signInWithFacebook}><img src="https://www.gstatic.com/mobilesdk/160409_mobilesdk/images/auth_service_facebook.svg" alt="facebook" />Login with Facebook</Card.Link>
        </Card.Body>
      </Card>
    </React.Fragment>
  )

}
export default Login;