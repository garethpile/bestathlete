"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  var body;

  try {
   // console.log(event);
   // console.log(event.body);
    body = JSON.parse(event.body);
  } catch (error) {
    throw new Error("event.body not present: ", error);
  }

  var Application;
  var errorMessage;

  if (body.strava_access_token) {
    try {
      // Strava update ....
   //   console.log(event.body);

      var StravaAccessToken;
      var StravaRefreshToken;
      var StravaPartyId;
      var StravaExpiresAt;
      var StravaLastName;
      var StravaFirstName;

      try {
        StravaPartyId = body.PartyId;
        StravaPartyId = "" + StravaPartyId;
        StravaExpiresAt = body.strava_expires_at;
        StravaLastName = body.LastName;
        StravaFirstName = body.FirstName;
        StravaAccessToken = body.strava_access_token;
        StravaRefreshToken = body.strava_refresh_token;
      } catch (error) {
        errorMessage = "Error retrieving Strava token parameters: " + error;
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      var params = {
        TableName: "360dslPartyStrava",

        Item: {
          PartyId: StravaPartyId,
          LastName : StravaLastName,
          FirstName : StravaFirstName,
          strava_access_token: StravaAccessToken,
          strava_refresh_token: StravaRefreshToken,
          strava_expires_at: StravaExpiresAt,
          updateAt: new Date().getTime(),
        },
      };

      return dynamoDb.put(params, (error, data) => {
        if (error) {
          throw new Error(error);
        }
        // Else respond successfully ...
      //  console.log("Strava tokens inserted successfully.");

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
  } else if (Application == "TrainingPeaks") {
    try {
      // TraininPeaks Update ....

  //    console.log(event.body);
      let body = JSON.parse(event.body);

      var PartyId;
      var EmailAddress;
      var TPAccessToken;
      var TPRefreshToken;

      try {
        TPPartyId = body.PartyId;
        TPEmailAddress = body.EmailAddress;
        TPAccessToken = body.tp_access_token;
        TPRefreshToken = body.tp_refresh_token;
      } catch (error) {
        errorMessage = "Error retrieving TP token parameter values: " + error;
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      var params = {
        TableName: "360dslParty",
        Item: {
          PartyId: TPPartyId,
          email_address: TPEmailAddress,
          tp_access_token: TPAccessToken,
          tp_refresh_token: TPRefreshToken,

          updateAt: new Date().getTime(),
        },
      };

      return dynamoDb.put(params, (error, data) => {
        if (error) {
          errorMessage =
            "Error writing TP token parameter values to the DB: " + error;
          console.log(errorMessage);
          throw new Error(errorMessage);
        }

        // Else respond successfully ...
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
  }
};
