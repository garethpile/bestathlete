"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const https = require("https");
const axios = require("axios");
const qsTP = require("querystring");

exports.handler = function (event, context, callback) {
  var queryString;

  try {
    console.log(event);
    queryString = event.queryStringParameters;
    console.log(queryString);
  } catch (error) {
    const error_description =
      "Error extracting querparameters from event object: " + error;

    console.log(error_description);

    const error_response = {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: error_description,
    };
    callback(null, error_response);
  }

  if (queryString["hub.challenge"]) {
    console.log("Strava has just sent an OAUTH Callback Validation.");

    var challenge;

    try {
      challenge = queryString["hub.challenge"];

      var bodyData = {
        "hub.challenge": challenge,
      };

      const success_response = {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(bodyData),
      };
      callback(null, success_response);
    } catch (error) {
      const error_description =
        "Error extracting hub.challenge parameter: " + error;

      console.log(error_description);

      const error_response = {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: error_description,
      };

      callback(null, error_response);
    }
  } else {
    console.log("Strava has just sent an OAUTH Access Token Code.");

    var code = "";

    try {
      code = event.queryStringParameters.code;
      console.log(code);
    } catch (error) {
      // Log and return the error ...
      const error_description = "Invalid code provided in request: " + error;

      console.log(error_description);

      const error_response = {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: error_description,
      };
      callback(null, error_response);
    }

    var redirect_uri =
      "https://6kjj2t9ega.execute-api.us-east-1.amazonaws.com/staging/notificationactivity";
    var client_id = "7947";
    var client_secret = "471581ec88f559a66972e135ec0f59221d7de7da";
    var grant_type = "authorization_code";

    console.log(
      "################################################# Strava PARAMETERS:"
    );
    console.log("Code: ", code);
    console.log("Redirect", redirect_uri);

    var stravaTokenExchangePostURL = "https://www.strava.com/oauth/token";

    var m360StravaTokenUpdateURL =
      "https://sgsj8l5jj1.execute-api.us-east-1.amazonaws.com/staging/strava";

    const stravaTokenrequestBody = {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: grant_type,
      redirect_uri: redirect_uri,
      code: code,
    };

    console.log("Strava Token Exchange Request Body: ", stravaTokenrequestBody);

    const stravaTokenconfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const m360TPTokenconfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        stravaTokenExchangePostURL,
        qsTP.stringify(stravaTokenrequestBody),
        stravaTokenconfig
      )
      .then((result) => {
        console.log("Token Exchange RESULT.DATA: ", result.data);

        var strava_access_token = result.data.access_token;
        var strava_refresh_token = result.data.refresh_token;
        var party_id = result.data.athlete.id;
        var expires_at = result.data.expires_at;
        var last_name = result.data.athlete.lastname;
        var first_name = result.data.athlete.firstname;

        const m360TokenrequestBody = {
          PartyId: party_id,
          LastName: last_name,
          FirstName: first_name,
          strava_access_token: strava_access_token,
          strava_refresh_token: strava_refresh_token,
          strava_expires_at: expires_at,
        };

        axios
          .post(
            m360StravaTokenUpdateURL,
            m360TokenrequestBody,
            m360TPTokenconfig
          )
          .then((m360Result) => {
            console.log("m360 TOKEN UPDATE RESULT.DATA: ", m360Result.data);

            const success_response = {
              statusCode: 200,
              headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
              },
              body: `<meta http-equiv="refresh" content="0; url='https://main.d2ehwfu8n9t09f.amplifyapp.com'" />`,
            };
            callback(null, success_response);
          })
          .catch((error) => {
            const error_description =
              "ERROR invoking m360 TOKEN UPDATE POST: " + error;

            console.log(error_description);

            const error_response = {
              statusCode: 400,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
              },
              body: error_description,
            };
            callback(null, error_response);
          });
      })
      .catch((error) => {
        const error_description =
          "ERROR invoking Strava TOKEN EXCHANGE POST: " + error;

        console.log(error_description);

        const error_response = {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
          body: error_description,
        };

        callback(null, error_response);
      });
  }
};
