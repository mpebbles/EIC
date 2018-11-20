import axios from "axios";
// This file serves as a link between production code and tests

// if this variable true, supply testing values instead of actual
var supplyTestValues = false; //true;

export function factoryUpdateProfileInfo(args) {
  if (supplyTestValues) {
    return doNothing();
  }
  return axios(args);
}

function doNothing() {
  return;
}
