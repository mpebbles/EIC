import config from "../config";
import dispatcher from "../dispatcher";
import axios from "axios";

export function loadResources() {
    console.log("Implement me");
    // const token = localStorage.getItem("id_token");
    // axios({
    //     method: "get",
    //     url: config.BASE_URL + "/api/getResource/",
    //     headers: {Authorization: `Bearer ${token}`}
    // }).then(res => {
    //     console.log(res.data);
    //     dispatcher.dispatch({type: "RECEIVE_RESOURCES", resources: res.data})
    // });
}
