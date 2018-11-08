import dispatcher from "../dispatcher";
import axios from 'axios';

export function loadProfileInfo() {
  const token = localStorage.getItem('id_token');
  try {
    axios({ method: 'get', url: 'http://localhost:3000/api/get_buddy_profile/',
            headers: { Authorization: `Bearer ${token}` },
    }).then(res => {

      const person = res.data[0].a_user;
      dispatcher.dispatch({type: "GET_INFO", info: person})
    })
  }
  catch(err) {
    // No matches
  }
}

export function updateProfileInfo() {
  const token = localStorage.getItem('id_token');
  try {
  //  axios({ method: 'get', url: 'http://localhost:3000/api/get_buddy_partial/' + searchText, headers: { Authorization: `Bearer ${token}` },
  //  }).then(res => {
      //const persons = res.data[0].buddy;
      //dispatcher.dispatch({type: "RECEIVE_BUDDY_SEARCH", resources: persons})
  //  })
  }
  catch(err) {
    // No matches
  }
}
