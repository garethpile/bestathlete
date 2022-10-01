"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  var body;

  try {
    body = JSON.parse(event.body);
  } catch (error) {
    throw new Error("event.body not present: ", error);
  }

  var Application;
  var errorMessage;

  try {
    // Strava update ....
   
    var StravaAccessToken;
    var StravaRefreshToken;
    var StravaPartyId;
    var StravaExpiresAt;
    var StravaLastName;
    var StravaFirstName;
    var Customer360dslId;
    var StravaConnected;

    try {
      StravaPartyId = body.PartyId;
      StravaPartyId = "" + StravaPartyId;
      StravaExpiresAt = body.strava_expires_at;
      StravaLastName = body.LastName;
      StravaFirstName = body.FirstName;
      StravaAccessToken = body.strava_access_token;
      StravaRefreshToken = body.strava_refresh_token;
      Customer360dslId = body.customer360dslId;
      StravaConnected = body.strava_connected;
    } catch (error) {
      errorMessage = "Error retrieving Strava token parameters: " + error;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }

    var params = {
      TableName: "360dslPartyStrava",

      Item: {
        PartyId: StravaPartyId,
        LastName: StravaLastName,
        FirstName: StravaFirstName,
        strava_access_token: StravaAccessToken,
        strava_refresh_token: StravaRefreshToken,
        strava_expires_at: StravaExpiresAt,
        customer360dslId: Customer360dslId,
        strava_connected: StravaConnected,
        updateAt: new Date().getTime(),
      },
    };

    return dynamoDb.put(params, (error, data) => {
      if (error) {
        throw new Error(error);
      }
      // Else respond successfully ...
      console.log("Strava tokens inserted successfully.");

      var successDescription = {
        statusCode: 200,
        statusDescription: "Successfully executed",
      };
      var successResponse = {
        statusCode: 200,
        //   "headers": corsHeaders,
        body: JSON.stringify(successDescription),
        isBase64Encoded: false,
      };
      callback(null, successResponse);
    });
  } catch (error) {
    var errorException = "Execution Error: " + error;
    // Log and return the error ...
    console.log(errorException);

    var errorDescription = {
      statusCode: 400,
      statusDescription: errorException,
    };
    var errorResponse = {
      statusCode: 400,
      body: JSON.stringify(errorDescription),
      isBase64Encoded: false,
    };
    callback(null, errorResponse);
  }
};
