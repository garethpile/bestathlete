
'use strict';

const AWS = require('aws-sdk');
const atob = require('atob');

module.exports.handler = (event, context, callback) => {
  
  var queryString;
  var customer360dslId;
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  try{
    
    queryString = event.queryStringParameters;
    console.log(queryString);
    customer360dslId = queryString["customer360dslId"];
   
    // const customer360dslId = event.pathParameters.customer360dslId;

    
    var params = {
      TableName: '360dslPartyStrava',
      Key: 'customer360dslId',
      IndexName: 'customer360dslId-index',
      KeyConditionExpression: 'customer360dslId = :customer_360dsl_Id',
      ExpressionAttributeValues: { ':customer_360dsl_Id': customer360dslId  }
    
  };

    return dynamoDb.get(params, (error, data) => {
      if (error) {
        console.log(error)
        const response = {
              statusCode: 500,
              headers: {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,"
              },
              body: JSON.stringify(error),
            };
            callback(null, response);
      }else{
        console.log('Get Strava Info success');
        const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*",
              "Access-Control-Allow-Headers" : "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,"
            },
            body: JSON.stringify(data)
          };

            callback(null, response);
      }
    });
  }
  catch(error){
      console.log(error);
      const response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,"
      }
      ,body:JSON.stringify(error)
    };
    callback(null, response);
  } 
};

/*

"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const atob = require("atob");

module.exports.handler = (event, callback) => {
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
  console.log("Customer 360dsl ID: ", customer360dslId);
  // Retrieve Strava Information .....
  var params = {
    TableName: "360dslPartyStrava",
    Key: { customer360dslId: customer360dslId },
  };

  return dynamoDb.get(params, (error, data) => {
    if (error) {
      const errorMessage = "Error retrieving Strava Info from DB ....: " + error;
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
    console.log("Data retrieved from DB ....data", data);
console.log("Data retrieved from DB ....data.Item", data.Item);

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,",
      },
      body: JSON.stringify(data.Item),
    };
    return response;
  });
};

*/