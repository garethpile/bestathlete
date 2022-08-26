
const axios = require("axios");

exports.handler = async (event, context, callback) => {
  try {
    console.log("*** Extracting Event data ...");

    console.log(event);

    let eventData = JSON.parse(JSON.stringify(event));

    try {

      tp_access_token = eventData.tpTokenData.tp_access_token;
      let tp_start_date_time = eventData.Data.stravaActivityDetails.start_date;
      //Comment this out because the Sandbox environment testing does not have a live activity .... 
      //tp_start_date = tp_start_date_time.substring(0,10);
      // Set the date to a date we know there is an activity ....

      tp_start_date = '2021-08-21';

    } catch (error) {
      console.log("Input data not present: ", error);
      throw new Error(error);
    }

    console.log("TP Access Token: ", tp_access_token);
    console.log("TP Start Date: ", tp_start_date);

    var tpBearer = "Bearer ";
    tpBearer += tp_access_token;

    var tpGetWorkoutAPIURL = "https://api.sandbox.trainingpeaks.com/v1/workouts/"+tp_start_date+"/"+tp_start_date;
    
    try {
      // Make API Call ...

      console.log(
        "*** Making TP API Call ...",
        tpGetWorkoutAPIURL,
        "with authorization: ",
        tpBearer
      );

      const config = {
        method: "get",
        url: tpGetWorkoutAPIURL,
        headers: {
          accept: "application/json",
          authorization: tpBearer,
        },
      };

      let response = await axios(config);

      //console.log("Retrieved the following response from Strava: ",response);
      console.log(
        "Retrieved the following TP Workout Details: ",
        response.data
      );

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
    
    console.log("Error invoking TP API: " + error);

    return error;
  }
};

