/* Amplify Params - DO NOT EDIT
	API_360DSLBE_CUSTOMER3RDPARTYTABLE_ARN
	API_360DSLBE_CUSTOMER3RDPARTYTABLE_NAME
	API_360DSLBE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

var AWS = require("aws-sdk");
var DynamoDB = new AWS.DynamoDB.DocumentClient();

app.get("/strava", function (req, res) {
  console.log("Strava Oauth Redirect URL challenge received.");

  var challenge;
  try {
    challenge = req.query["hub.challenge"];
  } catch (error) {
    err = "Error accessing hub.challenge field: " + err;
    console.log(err);
    res.json({ error: err });
  }

  res.json({
    "hub.challenge": challenge,
  });
});

app.post("/strava", function (req, res) {
  // Add your code here

  var requestBody = "";

  console.log("Received Strava Activity Notification ......");
  console.log("Request received: ", req);

  try {
    //requestBody = JSON.parse(req.body);
    requestBody = req.body;
    console.log("POST request received after parsing JSON body: ", requestBody);
  } catch (error) {
    var errorMessage = "Error extracting body:" + error;
    console.log(errorMessage);
    res.json({ error: errorMessage });
  }

  var tableName = process.env.API_360DSLBE_ACTIVITIESSTRAVATABLE_NAME;
  console.log("Tablename: ", tableName);

  var id;
  var object_id = "";
  var aspect_type = "";
  var event_time = "";
  var owner_id = "";
  var subscription_id = "";

  try {
    event_time = requestBody.event_time;
    object_id = requestBody.object_id;
    id = object_id + event_time + "";
    aspect_type = requestBody.aspect_type;
    owner_id = requestBody.owner_id;
    subscription_id = requestBody.subscription_id;
  } catch (err) {
    var errorMessage = `Error extracting body parameters: ` + err;
    console.log(errorMessage);
    res.json({ error: errorMessage });
  }

  var params = {
    TableName: tableName,
    Item: {
      id: id,
      object_id: object_id,
      owner_id: owner_id,
      aspect_type: aspect_type,
      event_time: event_time,
      subscription_id: subscription_id,
    },
  };

  console.log("Params ...... ", params);

  DynamoDB.put(params, function (err, data) {
    if (err) {
      var errorMessage = "Error inserting data into DB: " + err;
      console.log(errorMessage);
      res.json({ error: errorMessage });
    } else {
      console.log(
        "Inserting the following data into ",
        tableName,
        ": ",
        params
      );
      res.json({
        statusCode: 200,
      });
    }
  });
});

app.post("/item/*", function (req, res) {
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/item", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/item", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;

/*

"use strict";
const { tagEvent } = require("./serverless_sdk");
var AWS = require('aws-sdk');
var DynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.hello = function (event, context, callback) {


  tagEvent("custom-tag", "hello world", { custom: { tag: "data" } });
  console.log('HTTPMethod ....... ', event.httpMethod);

  if (event.httpMethod == 'GET') {
    let challenge = '';
    try {
      challenge = event.queryStringParameters['hub.challenge'];
      console.log('hub.challenge: ........ ', challenge);
    }
    catch (err) {

      err = 'Error accessing hub.challenge field: ', err;
      console.log(err);
      callback(err, null);
    }
    callback(null,
      {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(
          {
            "hub.challenge": challenge
          },
          null,
          2
        )
      }
    )
  }
  else if (event.httpMethod == 'POST') {

    console.log('POST request received: ', event.body);

    var tableName = "360DegreesStravaActivities";

    try {
      var requestBody = JSON.parse(event.body);
      var aspect_type = requestBody.aspect_type;
      var event_time = requestBody.event_time;
      var object_id = requestBody.object_id;
      var owner_id = requestBody.owner_id;
      var subscription_id = requestBody.subscription_id;
    }
    catch (err) {
      console.log('Error extracting body parameters: ', err);
    }

    var params = {
      TableName: tableName,
      Item: {
        "aspect_type": aspect_type,
        "event_time": requestBody.event_time,
        "object_id": object_id,
        "owner_id": owner_id,
        "subscription_id": subscription_id
      }
    };

    console.log('Params ...... ', params);

    DynamoDB.put(params, function (err, data) {
      if (err) {
        console.log('Error Code 001-001: Internal Error inserting data into the database table ', tableName, '. Error: ', err);
        callback(err, null);
      }
      else {
        console.log('Inserting the following data into ', tableName, ': ', params);
        callback(null,
          {
            statusCode: 200,
            headers: {
              //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
              //"Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
            },
          }
        )
      }
    });
  }
};

*/
