
const axios = require("axios");

exports.handler = async (event, context, callback) => {
  try {
    //console.log("*** Extracting Event data ...");

    //console.log(event);

    var strava_owner_id;
    var strava_access_token;

    let eventData = JSON.parse(JSON.stringify(event));

    try {
      
      strava_owner_id = eventData.owner_id;
      strava_access_token = eventData.stravaTokenData.Item.strava_access_token.S;
      

    } catch (error) {
      console.log("Input data not present: ", error);
      throw new Error(error);
    }

  
    //console.log("Strava Owner ID: ", strava_owner_id);
    //console.log("Strava Access Token: ", strava_access_token);
 

   

    var stravaGetAthleteURL = "https://www.strava.com/api/v3/athletes/"+strava_owner_id;
    
    try {
      // Make API Call ...

      const config = {
        method: "get",
        url: stravaGetAthleteURL,
        headers: {
          accept: "application/json"
        },
        params:{
            client_id:7947,
            client_secret:'471581ec88f559a66972e135ec0f59221d7de7da',
            access_token: strava_access_token

        }
      };

      let response = await axios(config);

      //console.log("Retrieved the following response from Strava: ",response);
      console.log("Retrieved the following Strava data: ",response.data);

      return response.data;
    } catch (error) {

      var errorStatus = error.response.status;
      var errorText = error.response.statusText;

      var response = 
      {
        status: errorStatus,
        statusText: errorText
      };

      
      console.log("Error response from API: " , response);

      return response;
    }
  } catch (error) {
    
    console.log("Error invoking Strava API: " + error);

    return error;
  }
};
