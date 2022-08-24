"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
 // console.log(event.body);
  let body = JSON.parse(event.body);

  var TPAccessToken;
  var TPRefreshToken;

  try {
    TPAccessToken = body.tp_access_token;
  } catch (e) {
    console.log(e);
  }
  try {
    TPRefreshToken = body.tp_refresh_token;
  } catch (e) {
    console.log(e);
  }

  var params;

  try {
    params = {
      TableName: "360dslPartyTP",
      Item: {
        PartyId: body.PartyId,
        LastName: body.LastName + body.FirstName,
        FirstName: body.FirstName,
        EmailAddress: body.EmailAddress,
        tp_access_token: TPAccessToken,
        tp_refresh_token: TPRefreshToken,
        updateAt: new Date().getTime(),
      },
    };
  } catch (e) {
    // Log and return the error ...
    console.log("API Execution Error: " + e);
    var errorDescription = {
      statusCode: 400,
      statusDescription: "API Execution Error: " + e,
    };
    var errorResponse = {
      statusCode: 400,
      //   "headers": corsHeaders,
      body: JSON.stringify(errorDescription),
      isBase64Encoded: false,
    };
    callback(null, errorResponse);
  }

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      // Log and return the error ...
      console.log("API Execution Error: " + error);
      var errorDescription = {
        statusCode: 400,
        statusDescription: "API Execution Error: " + error,
      };
      var errorResponse = {
        statusCode: 400,
        //  "headers": corsHeaders,
        body: JSON.stringify(errorDescription),
        isBase64Encoded: false,
      };
      callback(null, errorResponse);
    }

    // Else respond successfully ...
    var successDescription = {
      statusCode: 200,
      statusDescription: "Successfully executed", };
    var successResponse = {
      statusCode: 200,
      //   "headers": corsHeaders,
      body: JSON.stringify(successDescription),
      isBase64Encoded: false,
    };
    callback(null, successResponse);
  });
};
