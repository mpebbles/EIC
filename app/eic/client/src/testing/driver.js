//import Factory from "../src/Factory"
//import * as ProfileActions from "../actions/ProfileActions";
import { testUpdateProfileInfo } from './actions/testProfileActions';
// put all functions to call here
export function runAll() {
    if(!testUpdateProfileInfo()) {
      alert("testUpdateProfileInfo did not pass");
      return;
    }
    alert("All unit tests passed!");
}

// put all test functions here
// convention for function names will be fileName_functionName()
