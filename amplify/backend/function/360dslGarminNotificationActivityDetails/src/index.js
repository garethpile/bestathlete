

/* Amplify Params - DO NOT EDIT
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
//console.log("Appsyncurl: ", appsyncUrl);
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require("./graphql/mutations.js").mutation;
const apiKey = process.env.API_360DSLBE_GRAPHQLAPIKEYOUTPUT;
//console.log("Apikey: ", apiKey);

exports.handler = async (event) => {
  //console.log("Incoming Garmin activity notification event : ", event);
   //console.log("Startin");
  var GarminActivityRequestBody;
  var GarminActivityDetails;
  var GarminActivityDetailsSummary;

  var GarminAccountId;
  var GarminActivityId;

  //var GarminActivity;
  var GarminActivityType;
  var GarminActivityStartTime;
  var GarminActivityDistance;
  var GarminActivityDuration;
  var GarminActivityDescription;
  var GarminAveragePaceInMinutesPerKilometer;
  var GarminActiveKilocalories;
  var GarminAverageHeartRateInBeatsPerMinute;

  try {
    GarminActivityRequestBody = JSON.parse(event.body);
    GarminActivityDetails = GarminActivityRequestBody.activityDetails[0];
    GarminActivityDetailsSummary = GarminActivityDetails.summary;

    GarminAccountId = GarminActivityDetails.userId;
    GarminActivityId = GarminActivityDetails.activityId;

    GarminActivityDescription = GarminActivityDetailsSummary.activityName;
    GarminActivityType = GarminActivityDetailsSummary.activityType;
    GarminActivityStartTime = GarminActivityDetailsSummary.startTimeInSeconds;
    GarminActivityDistance = GarminActivityDetails.distanceInMeters;
    GarminActivityDuration = GarminActivityDetailsSummary.durationInSeconds;
    GarminAveragePaceInMinutesPerKilometer = GarminActivityDetailsSummary.averagePaceInMinutesPerKilometer;
    GarminActiveKilocalories = GarminActivityDetailsSummary.activeKilocalories;
    GarminAverageHeartRateInBeatsPerMinute = GarminActivityDetailsSummary.averageHeartRateInBeatsPerMinute;

    GarminActivity = GarminActivityDetails;

    console.log("Incoming Garmin Activity Details: ", GarminActivityDetails);
  } catch (error) {
    const error_description = "Error retrieving Garmin Input Data: " + error;
    console.log(error_description);

    const error_response = {
      statusCode: "400",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: error_description,
    };
    //return error_response;
    return error_response;
  }

  try {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    //console.log(typeof jsonResponse);
    let GarminActivityStringify = JSON.stringify(GarminActivity);

    const item = {
      input: {
        GarminAccountId: GarminAccountId,
        GarminActivityId: GarminActivityId,
        GarminActivityDescription: GarminActivityDescription,
        GarminActivityType: GarminActivityType,
        GarminActivityStartTime: GarminActivityStartTime,
        GarminActivityDistance: GarminActivityDistance,
        GarminActivityDuration: GarminActivityDuration,
        GarminAveragePaceInMinutesPerKilometer:GarminAveragePaceInMinutesPerKilometer,
        GarminActiveKilocalories: GarminActiveKilocalories,
        GarminAverageHeartRateInBeatsPerMinute: GarminAverageHeartRateInBeatsPerMinute,
        GarminActivity: GarminActivityStringify
      }
    };

    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
      query: graphqlQuery,
      operationName: "createACTIVITIESGARMIN",
      variables: item,
    });

    if (apiKey) {
      req.headers["x-api-key"] = apiKey;
    } else {
      const signer = new AWS.Signers.V4(req, "appsync", true);
      signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    }

    const data = await new Promise((resolve, reject) => {
      const httpRequest = https.request(
        { ...req, host: endpoint },
        (result) => {
          result.on("data", (data) => {
            resolve(JSON.parse(data.toString()));
          });
        }
      );

      httpRequest.write(req.body);
      httpRequest.end();
    });

    console.log("API result: ", data);

    const success_response = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(data),
    };
    //return success_response;
    return success_response;
  } catch (error) {
    const error_description = "Error processing Garmin Activity: " + error;
    console.log(error_description);

    const error_response = {
      statusCode: "400",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: error_description,
    };
    //return error_response;
    return error_response;
  }
};
