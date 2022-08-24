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
//console.log("GraphQLQuery: ",graphqlQuery);
const apiKey = process.env.API_360DSLBE_GRAPHQLAPIKEYOUTPUT;
//console.log("Apikey: ", apiKey);

exports.handler = async (event) => {
  console.log("Incoming Garmin MANUAL activity notification event : ", event);

  var GarminActivityRequestContext;
  var GarminActivityRequestBody;
  var GarminActivityDetails;

  var GarminAccountId;
  var GarminActivityId;

  var GarminActivityDescription;
  var GarminActivityType;
  var GarminActivityStartTime;
  var GarminActivityDistance;
  var GarminActivityDuration;
  var GarminActivity;

  try {
    GarminActivityRequestContext = event.requestContext;
    GarminActivityRequestBody = JSON.parse(event.body);
    GarminManuallyUpdatedActivities =
      GarminActivityRequestBody.manuallyUpdatedActivities[0];

    GarminAccountId = GarminActivityRequestContext.accountId;
    GarminActivityId = GarminManuallyUpdatedActivities.activityId;

    GarminActivityDescription = GarminManuallyUpdatedActivities.activityName;
    GarminActivityType = GarminManuallyUpdatedActivities.activityType;
    GarminActivityStartTime =
      GarminManuallyUpdatedActivities.startTimeInSeconds;
    GarminActivityDistance = GarminManuallyUpdatedActivities.distanceInMeters;
    GarminActivityDuration = GarminManuallyUpdatedActivities.durationInSeconds;

    GarminActivity = GarminActivityDetails;

    //console.log("Incoming Garmin Activity Details: ", GarminActivityDetails);
  } catch (error) {
    const error_description = "Error retrieving Garmin Input Data: " + error;
    console.log(error_description);

    const error_response = {
      "statusCode": 400,
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      "body": error_description
    };
    return error_response;
  }

  const req = new AWS.HttpRequest(appsyncUrl, region);

  //console.log(typeof jsonResponse);
  let GarminActivityStringify = JSON.stringify(GarminManuallyUpdatedActivities);

  const item = {
    input: {
      GarminAccountId: GarminAccountId,
      GarminActivityId: GarminActivityId,
      GarminActivityDescription: GarminActivityDescription,
      GarminActivityType: GarminActivityType,
      GarminActivityStartTime: GarminActivityStartTime,
      GarminActivityDistance: GarminActivityDistance,
      GarminActivityDuration: GarminActivityDuration,
      GarminActivity: GarminActivityStringify,
    },
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
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      result.on("data", (data) => {
        resolve(JSON.parse(data.toString()));
      });
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

  //console.log("API result: ", data);

  const success_response = {
    "statusCode": 200,
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    "body": JSON.stringify(data)
  };
  return success_response;
};
