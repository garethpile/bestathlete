/* Amplify Params - DO NOT EDIT
	API_360DSLBE_ACTIVITIESSTRAVATABLE_ARN
	API_360DSLBE_ACTIVITIESSTRAVATABLE_NAME
	API_360DSLBE_GRAPHQLAPIENDPOINTOUTPUT
	API_360DSLBE_GRAPHQLAPIIDOUTPUT
	API_360DSLBE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// Zones removed becuase only applies to Strava Accounts with Pro subscription

const https = require("https");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_360DSLBE_GRAPHQLAPIENDPOINTOUTPUT;
//console.log("Appsyncurl: ",appsyncUrl);
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require("./query.js").mutation;
const apiKey = process.env.API_360DSLBE_GRAPHQLAPIKEYOUTPUT;
//console.log("Apikey: ",apiKey);

exports.handler = async (event) => {
 

  var jsonResponse = event.stravaActivityDetails;
  

  //console.log("Incoming event", event);
  //console.log("Event: ", event);



  let activityID;
  let ownerID;
  let activityName;
  let activityDistance;
  let activityStartDate;
  let activityMovingTime;
  let activityType;
  let activityAverageHeartRate;
  let activitySufferScore;
  let activityCalories;
  let activityTotalElevationGain;
  let activityTotalElevationGainInt;
  let activityAverageSpeed;
  let activityAverageTemp;
  let activityAverageCadence;
  let activityAverageCadenceInt;
  let activityLocation;
  //let activityZones;

  if (typeof jsonResponse.object_id !== "undefined" && typeof jsonResponse.object_id !== null) {
    //console.log("object_id found.")
    activityID = jsonResponse.object_id;
  }
  else{

    //console.log("No object_id found. Using id instead.")
    activityID = jsonResponse.id;
    
  }
  ownerID = jsonResponse.athlete.id;
  activityName = jsonResponse.name;
  activityDistance = jsonResponse.distance;
  activityStartDate = jsonResponse.start_date;
  activityMovingTime = jsonResponse.moving_time;
  activityType = jsonResponse.type;
  if (
    typeof jsonResponse.average_heartrate !== "undefined" &&
    jsonResponse.average_heartrate !== null
  ) {
    
    activityAverageHeartRate = jsonResponse.average_heartrate;
  }
  if (
    typeof jsonResponse.suffer_score !== "undefined" &&
    jsonResponse.suffer_score !== null
  ) {
    activitySufferScore = jsonResponse.suffer_score;
  }
  activityCalories = jsonResponse.calories;
  if (
    typeof jsonResponse.total_elevation_gain !== "undefined" &&
    jsonResponse.total_elevation_gain !== null
  ) {
    activityTotalElevationGain = jsonResponse.total_elevation_gain;
    //console.log("activityTotalElevationGain: " + activityTotalElevationGain);
    activityTotalElevationGainInt = Math.floor(activityTotalElevationGain);
   // console.log("activityTotalElevationGainInt: " + activityTotalElevationGainInt);
  }
  activityAverageSpeed = jsonResponse.average_speed;
  if (
    typeof jsonResponse.average_temp !== "undefined" &&
    jsonResponse.average_temp !== null
  ) {
    activityAverageTemp = jsonResponse.average_temp;
  }
  if (
    typeof jsonResponse.average_cadence !== "undefined" &&
    jsonResponse.average_cadence !== null
  ) {
    activityAverageCadence = jsonResponse.average_cadence;
    activityAverageCadenceInt = Math.floor(activityAverageCadence);
  }
  if (
    typeof jsonResponse.location !== "undefined" &&
    jsonResponse.location !== null
  ) {
    activityLocation = jsonResponse.location;
  }
  //if (
    //typeof event.stravaActivityZones.Payload !== "undefined" &&
   // event.stravaActivityZones.Payload !== null
 // ) {
    //activityZones = JSON.stringify(event.stravaActivityZones.Payload);
    //console.log("event.stravaActivityZones.Payload: " + activityZones);

    //console.log("event.stravaActivityZones.Payload STRINGIFIED: " + JSON.stringify(activityZones));

//  }
 // else{
  //  console.log("event.stravaActivityZones.Payload is UNDEFINED or NULL.");
//  }
  //console.log("Activity ID: ", activityID);
  //console.log("Athlete ID: ", ownerID);
  //console.log("Activity name: ", activityName);
  //console.log("Distance: ", activityDistance);
  //console.log("Start Date: ", activityStartDate);
  //console.log("Moving Time: ", activityMovingTime);
  //console.log("Activity Type: ", activityType);
  //console.log("Average heart rate: ", activityAverageHeartRate);
  //console.log("Suffer Score: ", activitySufferScore);
  //console.log("Calories: ", activityCalories);
  //console.log("Elevation Gain: ", activityTotalElevationGain);
  //console.log("Average Speed: ", activityAverageSpeed);
  //console.log("Average Temp: ", activityAverageTemp);
  //console.log("Average Cadence: ", activityAverageCadence);
  //console.log("Location: ", activityLocation);

  activityID = activityID +"";
  ownerID = ownerID+'';

  const req = new AWS.HttpRequest(appsyncUrl, region);

  //console.log(typeof jsonResponse);
  //let jsonResponseParse = JSON.stringify(jsonResponse);

  const item = {
    input: {
      ActivityAverageCadence: activityAverageCadenceInt,
      ActivityAverageHeartRate: activityAverageHeartRate,
      ActivityAverageSpeed: activityAverageSpeed,
      ActivityAverageTemp: activityAverageTemp,
      ActivityCalories: activityCalories,
      ActivityDate: activityStartDate,
      ActivityDescription: activityName,
      ActivityDistance: activityDistance,
      ActivityElevationGain: activityTotalElevationGainInt,
      ActivityLocation: activityLocation,
      ActivityMovingTime: activityMovingTime,
      ActivityStressScore: activitySufferScore,
      ActivityType: activityType,
      ActivityStravaActivityId: activityID,
      ActivityStravaOwnerId: ownerID
      //StravaActivity:jsonResponseParse,
      //StravaActivityZones:activityZones
    }
  };

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: graphqlQuery,
    operationName: "CreateACTIVITIES360DSL",
    variables: item,
  });

  if (apiKey) {
    req.headers["x-api-key"] = apiKey;
  } else {
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  }

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      result.on("data", (data) => {
        resolve(JSON.parse(data.toString()));
      });
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

 // console.log("API result: ", data);

  return {
    statusCode: 200,
    body: data,
  };
};

