import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import configs from '../configs/configs';

if (!firebase.apps.length) {
  firebase.initializeApp(configs.firebase);
}

export default firebase;