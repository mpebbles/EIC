//import * as ProfileActions from "./actions/ProfileActions"
//import dispatcher from "./dispatcher";
import axios from 'axios';
// This file serves as a link between production code and tests

// if this variable true, supply testing values instead of actual
var supplyTestValues = false;//true;

//export function factoryFunction() {
//  if(supplyTestValues) {
//    console.log("Output controlled function here");
//    return;
//  }
//}

export function factoryUpdateProfileInfo(args) {
  if(supplyTestValues) {
    return doNothing();
  }
  return axios(args);
}

function doNothing() {
  return;
}
