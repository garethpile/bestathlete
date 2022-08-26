"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  console.log(event.body);
  let body = JSON.parse(event.body);

  var garminAccountId;
  var garminRequestOauthToken;
  var garminRequestOauthSecret;
  var garminUserOauthToken;
  var garminUserOauthSecret;

  try {
    garminAccountId = body.accountId;
    garminRequestOauthToken = body.garminRequestOauthToken;
    garminRequestOauthSecret = body.garminRequestOauthSecret;
    garminUserOauthToken = body.garminUserOauthToken;
    garminUserOauthSecret = body.garminUserOauthSecret;

  } catch (error) {
    console.log(error);
  }

  var params;

  try {
    params = {
      TableName: "360dslPartyGarmin",
      Item: {
        accountId: garminAccountId,
        garminRequestOauthToken: garminRequestOauthToken,
        garminRequestOauthSecret: garminRequestOauthSecret,
        garminUserOauthToken:garminUserOauthToken,
        garminUserOauthSecret:garminUserOauthSecret,
        updateAt: new Date().getTime(),
      },
    };
  } catch (error) {
    // Log and return the error ...
    console.log("API Execution Error: " + error);
    var errorDescription = {
      statusCode: 400,
      statusDescription: "API Execution Error: " + error,
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
};
