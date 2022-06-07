import axios from 'axios';




const baseApi="https://paym-api.herokuapp.com/";


export const getClients=async()=>{


    return fetch(baseApi)
.then((response) => response.json())
.then((responseJson) => {
    console.log("in getAPI",responseJson);
return responseJson.Data;
})
.catch((error) => {
console.error(error);
});
    try{


        let response= await axios.get(baseApi);
        console.log("API Response",api,response);
        return response.Data;
      
    }catch (err) {
        // Handle Error Here
        console.log("Error in API",APIURL,data,err);
    
    } 

}
export  const postRequest=async(api,data)=>{
    const APIURL= baseApi+"/"+api;
 //;
    try{
        let response= await axios.post(APIURL,data);
        console.log("API Response",api,response);
       // toast.success(response.status+"\n"+response.data);
        return response;
    }catch (err) {
        // Handle Error Here
        console.log("Error in API",APIURL,data,err);
    
    } 
  
}