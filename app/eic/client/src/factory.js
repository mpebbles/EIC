import axios from "axios";
import config from "./config.json";
// This file serves as a link between production code and tests

// if this variable true, supply testing values instead of actual
var supplyTestValues = false;

if (config.RUN_UNIT_TESTS === "true") supplyTestValues = true;

export function factoryUpdateProfileInfo(args) {
  if (supplyTestValues) {
    return doNothing();
  }
  return axios(args);
}

function doNothing() {
  return;
}
