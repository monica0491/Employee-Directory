import axios from "axios";
export default {
    // Gets all users from Random User API with axios
    getUsers: function () {
        return axios.get("https://randomuser.me/api/?results=500&nat=us");
    }
};