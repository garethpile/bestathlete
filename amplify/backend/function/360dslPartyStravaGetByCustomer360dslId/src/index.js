"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const atob = require("atob");

module.exports = (event, callback) => {
  var queryString;
  var customer360dslId = "";

  try {
    console.log(event);
    queryString = event.queryStringParameters;
    console.log(queryString);
    var customer360dslId = queryString["customer360dslId"];
  } catch (error) {
    const errorMessage = "Error extracting QueryStringParameters: " + error;
    var bodyData = {
      Error: errorMessage,
    };
    const response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,",
      },
      body: JSON.stringify(bodyData),
    };
    return response;
  }
  console.log("Strava Owner ID: ", customer360dslId);
  // Retrieve Strava Information .....
  var params = {
    TableName: "360dslPartyStrava",
    Key: { customer360dslId: customer360dslId },
  };

  return dynamoDb.get(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, data.Item);
  });
};
