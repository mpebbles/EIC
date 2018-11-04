import dispatcher from "../dispatcher";
import axios from 'axios';

export function loadBuddySearchResults(searchText) {
  if (!searchText.length) {
    dispatcher.dispatch({type: "RECEIVE_BUDDY_SEARCH", resources: []});
    return;
  }
  const token = localStorage.getItem('id_token');
  try {
    axios({ method: 'get', url: 'http://localhost:3000/api/get_buddy_partial/' + searchText, headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      const persons = res.data[0].buddy;
      dispatcher.dispatch({type: "RECEIVE_BUDDY_SEARCH", resources: persons})
    })
  }
  catch(err) {
    // No matches
  }
}

export function sendRequest(buddyEmail) {
  const token = localStorage.getItem('id_token');
  try {
    axios({ method: 'get', url: 'http://localhost:3000/api/add_pending_buddy/' + buddyEmail, headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      const persons = res.data[0].buddy;
    })
    alert("Your connection request to " + buddyEmail + " has been sent!");
  }
  catch(err) {
    // No matches
  }
}
