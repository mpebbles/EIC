import dispatcher from "../dispatcher";
import axios from 'axios';
import { factoryUpdateProfileInfo } from '../factory'


export function uploadImage(uploadImage) {
  const token = localStorage.getItem('id_token');
  try {
    axios({ method: 'post', url: 'http://localhost:3000/api/add_user_image/',
    data: uploadImage, headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      dispatcher.dispatch({type: "UPDATE_IMAGE", image: uploadImage});
    })
  }
  catch(err) {
    console.log(err);
  }
}

export function loadProfileInfo() {
  const token = localStorage.getItem('id_token');
  try {
    axios({ method: 'get', url: 'http://localhost:3000/api/get_user_type/',
    headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      if(res.data == 'Student') {
        axios({ method: 'get', url: 'http://localhost:3000/api/get_student_profile/',
        headers: { Authorization: `Bearer ${token}` },
      }).then(res_1 => {
        const person = res_1.data[0].a_user;
        dispatcher.dispatch({type: "GET_INFO", info: person})
        })
      }
      else if(res.data == 'Buddy') {
        axios({ method: 'get', url: 'http://localhost:3000/api/get_buddy_profile',
        headers: { Authorization: `Bearer ${token}` },
      }).then(res_2 => {
          const persons = res_2.data[0].a_user;
          dispatcher.dispatch({type: "GET_INFO", info: persons});
        })
      }
    })
  }
  catch(err) {
    //console.log(err);
  }
}


export function updateProfileInfo(state) {
  var sendObj = {};
  sendObj['biography'] = state.biography;
  // set new local value to update
  state.info[0]['biography'] = state.biography;
  if(state.info[0].hasOwnProperty('itemtype')
    && state.info[0].itemtype == "Student") {
      sendObj['interests'] = state.interests;
      // set new local value to update
      state.info[0]['interests'] = state.interests;
  }
  else if(state.info[0].hasOwnProperty('itemtype')
      && state.info[0].itemtype == "Buddy") {
        sendObj['skills'] = state.skills;
        sendObj['company'] = state.company;
        // set new local value to update
        state.info[0]['skills'] = state.skills;
        state.info[0]['company'] = state.company;
    }

  const token = localStorage.getItem('id_token');
  try {
    var postURL = "";
    if(this.state.info[0].itemtype == "Buddy") {
       postURL = "http://localhost:3000/api/edit_buddy_profile/";
    }
    else if(this.state.info[0].itemtype == "Student") {
      postURL = "http://localhost:3000/api/edit_student_profile/";
    }
    const args = { method: 'post', url: postURL, data: sendObj,
     headers: { Authorization: `Bearer ${token}` }}
    // call factory to get API function if not unit test, else don't call actual API
    // Then will fail if not axios call, so return value in catch for unit test
    factoryUpdateProfileInfo(args).then(res => {
      dispatcher.dispatch({type: "GET_INFO", info: state.info[0]})
    })
  }
  catch(err) {
    // return for the sake of unit test
    return state.info[0];
  }
  // so the user can tell something happened after save
  window.location.reload(true);
}
