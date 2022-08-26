/* Amplify Params - DO NOT EDIT
	API_360DSLBE_CUSTOMER3RDPARTYTABLE_ARN
	API_360DSLBE_CUSTOMER3RDPARTYTABLE_NAME
	API_360DSLBE_GRAPHQLAPIENDPOINTOUTPUT
	API_360DSLBE_GRAPHQLAPIIDOUTPUT
	API_360DSLBE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const https = require("https");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_360DSLBE_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require("./query.js").mutation;
const apiKey = process.env.API_360DSLBE_GRAPHQLAPIKEYOUTPUT;

exports.handler = async (event) => {
  console.log("GraphQL Endpoint: " +appsyncUrl);
  console.log("Incoming event data: " + event);

  var jsonResponse = event.tpActivityDetails[0];
  console.log(jsonResponse);

  let activityID;
  let ownerID;
  let activityName;
  let activityDistance;
  let activityStartDate;
  let activityMovingTime;
  let activityType;
  let activityAverageHeartRate;
 
  let activityCalories;
  let activityTotalElevationGain;
  let activityAverageSpeed;
  let activityAverageTemp;
  let activityAverageCadence;
 
  let activityTSS;

  
  activityID = jsonResponse.Id;
  ownerID = jsonResponse.AthleteId;
  activityName = jsonResponse.Title;
  activityDistance = jsonResponse.Distance;
  let activityStartDateTime = jsonResponse.WorkoutDay;
  activityStartDate = activityStartDateTime.substring(0,10);
  activityMovingTime = jsonResponse.TotalTime;
  activityType = jsonResponse.WorkoutType;
  activityTSS = jsonResponse.TssActual;
  activityAverageHeartRate = jsonResponse.HeartRateAverage;
  activityTotalElevationGain = jsonResponse.ElevationGain;
  activityCalories = jsonResponse.Calories;
  activityAverageSpeed = jsonResponse.VelocityAverage;
  activityAverageTemp = jsonResponse.TempAvg;
  activityAverageCadence = jsonResponse.CadenceAverage;
  

  console.log("Activity ID: ", activityID);
  console.log("Athlete ID: ", ownerID);
  console.log("Activity name: ", activityName);
  console.log("Distance: ", activityDistance);
  console.log("Start Date: ", activityStartDate);
  console.log("Moving Time: ", activityMovingTime);
  console.log("Activity Type: ", activityType);
  console.log("Average heart rate: ", activityAverageHeartRate);
  
  console.log("Calories: ", activityCalories);
  console.log("Elevation Gain: ", activityTotalElevationGain);
  console.log("Average Speed: ", activityAverageSpeed);
  console.log("Average Temp: ", activityAverageTemp);
  console.log("Average Cadence: ", activityAverageCadence);
  
  console.log("TSS: ", activityTSS);

  const req = new AWS.HttpRequest(appsyncUrl, region);

  console.log(typeof jsonResponse);
  let jsonResponseParse = JSON.stringify(jsonResponse);

  const item = {
    input: {
      TPActivityId: activityID,
      TPActivityOwnerId: ownerID,
      TPActivityDescription: activityName,
      TPActivityType: activityType,
      TPActivityDate: activityStartDate,
      TPActivityMovingTime: activityMovingTime,
      TPActivityDistance: activityDistance,
      TPActivityAverageHeartRate: activityAverageHeartRate,
      TPActivityTSS: activityTSS,
      TPActivityCalories: activityCalories,
      TPActivityElevationGain: activityTotalElevationGain,
      TPActivityAverageSpeed: activityAverageSpeed,
      TPActivityAverageCadence: activityAverageCadence,
      TPActivityAverageTemp: activityAverageTemp,
      TPActivity: jsonResponseParse,
    },
  };

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: graphqlQuery,
    operationName: "createACTIVITIESTP",
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

  console.log("API result: ", data);

  return {
    statusCode: 200,
    body: data,
  };
};
