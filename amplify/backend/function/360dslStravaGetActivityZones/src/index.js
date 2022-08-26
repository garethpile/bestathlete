


const axios = require("axios");

exports.handler = async (event, context, callback) => {
  try {
    //console.log("*** Extracting Event data ...");

    // console.log(event);

    var object_id;
    var strava_owner_id;
    var strava_access_token;

    let eventData = JSON.parse(JSON.stringify(event));

    try {
      
      strava_owner_id = eventData.owner_id;
      strava_access_token = eventData.stravaTokenDataRefreshed.Item.strava_access_token.S;
      object_id = eventData.object_id;
      

    } catch (error) {
      console.log("Input data not present: ", error);
      throw new Error(error);
    }

  
    // console.log("Strava Owner ID: ", strava_owner_id);
    // console.log("Strava Access Token: ", strava_access_token);
 

   

    var stravaGetActivityZonesURL = "https://www.strava.com/api/v3/activities/"+object_id+"/zones";
    
    console.log("stravaGetActivityZones URL : "+stravaGetActivityZonesURL);
    try {
      // Make API Call ...

      const config = {
        method: "get",
        url: stravaGetActivityZonesURL,
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
       console.log("Retrieved the following Strava Activity Zone data: "+ response.data);
       
      return response.data;
    } catch (error) {

      console.log("Error response calling API: " , error);

      //var errorStatus = error.response.status;
      //var errorText = error.response.statusText;

      var errorResponse = 
      {
        status: "API Call Error",
        statusText: error
      };

      
      //console.log("Error response from API: " , response);

      return errorResponse;
    }
  } catch (error) {
    
    console.log("Error getting Strava Activity Zones: " + error);

    return error;
  }
};

