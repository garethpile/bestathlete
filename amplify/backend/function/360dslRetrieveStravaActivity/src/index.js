/* Amplify Params - DO NOT EDIT
	API_360DSLBE_CUSTOMER3RDPARTYTABLE_ARN
	API_360DSLBE_CUSTOMER3RDPARTYTABLE_NAME
	API_360DSLBE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */var aws = require("aws-sdk");
const request = require("request");
const axios = require("axios");

exports.handler = async (event, context, callback) => {
  try {
    console.log("*** Extracting Event data ...");

    console.log(event);

    var owner_id;
    var object_id;
    var strava_access_token;

    let eventData = JSON.parse(JSON.stringify(event));

    try {
      object_id = eventData.object_id;
      owner_id = eventData.owner_id;
      strava_access_token = eventData.stravaTokenDataRefreshed.Item.strava_access_token.S;

    } catch (error) {
      console.log("Input data not present: ", error);
      throw new Error(error);
    }

    //console.log("Strava Activity ID: ", object_id);
    //console.log("Strava Owner ID: ", owner_id);
    //console.log("Strava Access Token: ", strava_access_token);

    var stravaBearer = "Bearer ";
    stravaBearer += strava_access_token;
    var stravaActivityAPIURL = "https://www.strava.com/api/v3/activities/";
    stravaActivityAPIURL += object_id; // append object_id form Dynamo trigger - this is the Strava activity ID

    try {
      //console.log( "Making Strava API Call ...", stravaActivityAPIURL, "with authorization: ", stravaBearer );

      const config = {
        method: "get",
        url: stravaActivityAPIURL,
        headers: {
          accept: "application/json",
          authorization: stravaBearer,
        },
      };

      let response = await axios(config);

      console.log( "Retrieved the following Strava Activity details: ",response.data );

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
