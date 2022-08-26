"use strict";

const AWS = require("aws-sdk");
var axios = require("axios");
var oauthSignature = require("oauth-signature");

//const qsTP = require("querystring");

exports.handler = function (event, context, callback) {
  console.log(
    "User has initiated a Garmin Acquire Unauthorized Request Token and Token Secret."
  );

  var garmin_request_oauth_token_string;
  var garmin_request_oauth_token_array;
  var garmin_request_oauth_token;

  var garmin_request_oauth_secret_string;
  var garmin_request_oauth_secret_array;
  var garmin_request_oauth_secret;

  console.log("Incoming event data: ", event);

  let params;
  let userId;

  params = new URLSearchParams(event.queryStringParameters);

  userId= params.get("userId");
  console.log("UserId: ", userId)

  var oauth_url =
    "https://connectapi.garmin.com/oauth-service/oauth/request_token";
  var httpMethod = "POST";

  var oauth_consumer_key = "0c0feece-cda0-4d4e-b0f4-c9edb150d8d1";
  var oauth_consumer_secret = "ArJmElMdIWGPI4G6k7vvA4B8UhnO9HGbxOB";
  var oauth_signature_method = "HMAC-SHA1";
  var oauth_version = "1.0";

  var oauth_nonce = Math.random();
  var date = new Date();
  var oauth_timestamp = Math.floor(date.getTime() / 1000.0);

  // var oauth_signature_basestring = `OAuth oauth_consumer_key="${auth_consumer_key}",oauth_signature_method="${oauth_signature_method}",oauth_timestamp="${oauth_timestamp}",oauth_nonce="${oauth_nonce}",oauth_version="${oauth_version}"`;

  // Generate HMAC-SHA1 hash ......

  var oauth_parameters = {
    oauth_consumer_key: oauth_consumer_key,
    oauth_signature_method: oauth_signature_method,
    oauth_timestamp: oauth_timestamp,
    oauth_nonce: oauth_nonce,
    oauth_version: oauth_version,
  };

  // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
  var oauth_encodedSignature = oauthSignature.generate(
    httpMethod,
    oauth_url,
    oauth_parameters,
    oauth_consumer_secret
  );
  // generates a BASE64 encode HMAC-SHA1 hash

  console.log("Signature: ", oauth_encodedSignature);

  var oauth_signature_basestring = `OAuth oauth_consumer_key="${oauth_consumer_key}",oauth_signature_method="${oauth_signature_method}",oauth_timestamp="${oauth_timestamp}",oauth_nonce="${oauth_nonce}",oauth_version="${oauth_version}",oauth_signature="${oauth_encodedSignature}"`;

  var oauthConfig = {
    method: httpMethod,
    url: oauth_url,
    headers: {
      Authorization: oauth_signature_basestring,
    },
  };

  console.log(oauthConfig);

  axios(oauthConfig)
    .then(function (response) {
      var garmin_response = response.data;
      console.log("Garmin Request Token Response: ", garmin_response);

      const garmin_oauth_parameters = garmin_response.split("&");
      try {
        garmin_request_oauth_token_string = garmin_oauth_parameters[0];
        garmin_request_oauth_token_array =
          garmin_request_oauth_token_string.split("=");
        garmin_request_oauth_token = garmin_request_oauth_token_array[1];

        garmin_request_oauth_secret_string = garmin_oauth_parameters[1];
        garmin_request_oauth_secret_array =
          garmin_request_oauth_secret_string.split("=");
        garmin_request_oauth_secret = garmin_request_oauth_secret_array[1];
      } catch (error) {
        console.log("Error: ", error);
        return "Error: ", error;
      }

      var m360GarminTokenUpdateURL =
        "https://sgsj8l5jj1.execute-api.us-east-1.amazonaws.com/staging/garmin";

      const m360TokenrequestBody = {
        accountId: userId,
        garminRequestOauthToken: garmin_request_oauth_token,
        garminRequestOauthSecret: garmin_request_oauth_secret,
      };

      console.log("m360TokenrequestBody: ", m360TokenrequestBody);

      const m360GarminTokenconfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .post(
          m360GarminTokenUpdateURL,
          m360TokenrequestBody,
          m360GarminTokenconfig
        )
        .then((m360Result) => {
          console.log(
            "m360 Garmin Consumer Secret UPDATE RESULT.DATA: ",
            m360Result.data
          );
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

      const success_response = {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: `<meta http-equiv="refresh" content="0; url='https://connect.garmin.com/oauthConfirm/?oauth_token=${garmin_request_oauth_token}&oauth_callback=https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/oauthconfirm'" />`,
      };
      callback(null, success_response);
    })
    .catch(function (error) {
      console.log("Garmin Request Token error: ", error);

      const error_response = {
        statusCode: "400",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(error),
      };
      callback(null, error_response);
    });
};
