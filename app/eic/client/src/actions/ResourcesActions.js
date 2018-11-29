import config from "../config";
import dispatcher from "../dispatcher";
import axios from "axios";



export function loadResources() {
    const token = localStorage.getItem("id_token");
    axios({
        method: "get",
        url: config.BASE_URL + "/api/getResource/",
        headers: {Authorization: `Bearer ${token}`}
    }).then(res => {
        var resources = JSON.stringify(res.data);
        console.log(resources);
        resources = JSON.parse(resources);
        resources = JSON.parse(JSON.stringify(resources[0])).resources;
        dispatcher.dispatch({type: "RECEIVE_RESOURCES", resources: resources})
    });
}

export function deleteResource(id) {
    const token = localStorage.getItem("id_token");
    var sendObj = {};
    sendObj["id"] = id;

    axios({
        method: "post",
        url: config.BASE_URL + "/api/deleteResourceById/",
        headers: {Authorization: `Bearer ${token}`},
        data: sendObj
    }).then(res => {
        console.log("Delete resource", id);
        this.loadResources();
        // var resources = JSON.stringify(res.data);
        // console.log(resources);
        // resources = JSON.parse(resources);
        // resources = JSON.parse(JSON.stringify(resources[0])).resources;
        // dispatcher.dispatch({type: "RECEIVE_RESOURCES", resources: resources})
    });
}
