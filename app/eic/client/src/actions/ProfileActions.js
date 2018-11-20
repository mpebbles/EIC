import axios from 'axios';
import dispatcher from "../dispatcher";
import UserTypeService from "../components/UserTypeService";

export function loadProfileInfo() {
  let userTypeService = new UserTypeService();
  const token = localStorage.getItem('id_token');
  const userType = userTypeService.getUserType();

      if(userType === 'Student') {
        axios({ method: 'get', url: 'http://localhost:3000/api/get_student_profile/',
        headers: { Authorization: `Bearer ${token}` },
      }).then(res_1 => {
        const person = res_1.data[0].a_user;
        dispatcher.dispatch({type: "GET_INFO", info: person})
        })
      }
      else if(userType === 'Buddy') {
        axios({ method: 'get', url: 'http://localhost:3000/api/get_buddy_profile',
        headers: { Authorization: `Bearer ${token}` },
      }).then(res_2 => {
          const persons = res_2.data[0].a_user;
          dispatcher.dispatch({type: "GET_INFO", info: persons});
        })
      }
      else if(userType === "Company") {
        console.log("Got Company userType");
      }
      else {
        console.log("Invalid userType");
      }
}

export function updateProfileInfo(stateValues) {
  const token = localStorage.getItem('id_token');
  try {
    alert("Server will receive post request containing new document values");
    // TODO: create object with all values
    // TODO: send to Server
    // TODO: update local state in flux
  //  axios({ method: 'get', url: 'http://localhost:3000/api/get_buddy_partial/' + searchText, headers: { Authorization: `Bearer ${token}` },
  //  }).thenStudent(res => {
      //const persons = res.data[0].buddy;
      //dispatcher.dispatch({type: "RECEIVE_BUDDY_SEARCH", resources: persons})
  //  })
  }
  catch(err) {
    // No matches
  }
}
