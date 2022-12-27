import axios from 'axios';
import { Url } from '../screen/Core';




const baseApi = Url;


export const getClients = async () => {


    return fetch(baseApi)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("in getAPI", responseJson);
            return responseJson.Data;
        })
        .catch((error) => {
            console.error(error);
        });
    try {


        let response = await axios.get(baseApi);
        console.log("API Response", api, response);
        return response.Data;

    } catch (err) {
        // Handle Error Here
        console.log("Error in API", APIURL, data, err);

    }

}