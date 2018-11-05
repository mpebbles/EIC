import dispatcher from "../dispatcher";
import axios from 'axios';

export function loadRequests() {
  const token = localStorage.getItem('id_token');
  try {
    axios({ method: 'get', url: 'http://localhost:3000/api/get_pending_student/', headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
       const persons = res.data[0].a_student;
       console.log(persons);
       dispatcher.dispatch({type: "RECEIVE_REQUESTS", requests: persons})
    })
  }
  catch(err) {
    // No matches
  }
}
