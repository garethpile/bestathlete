"use strict";

const AWS = require("aws-sdk");
var axios = require("axios");
var oauthSignature = require("oauth-signature");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

  console.log("User has initiated a Garmin Request User Access.");

  var garminAccountId;
  var garminRequestOauthVerifier;
  var garminRequestOauthToken;
  var garminRequestOauthSecret;
  
  let eventData = JSON.parse(JSON.stringify(event));

  console.log("Incoming eventData: ", eventData);
  
  try {
    garminRequestOauthToken = eventData.garminRequestOauthToken;
    garminRequestOauthVerifier = eventData.garminRequestOauthVerifier;
    garminRequestOauthSecret = eventData.garminUserData.Payload.Items[0].garminRequestOauthSecret;
    garminAccountId = eventData.garminUserData.Payload.Items[0].accountId;
  } catch (error) {
    console.log("Error: ",error)
    return error;
  }

  
  console.log("Incoming garminRequestOauthToken : ", garminRequestOauthToken);
  console.log("Incoming garminRequestOauthVerifier : ", garminRequestOauthVerifier);
  console.log("Incoming garminRequestOauthSecret : ", garminRequestOauthSecret);

  console.log("Incoming accountId: ", garminAccountId);

  var oauth_url =
    "https://connectapi.garmin.com/oauth-service/oauth/access_token";
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
    oauth_nonce: oauth_nonce,
    oauth_signature_method: oauth_signature_method,
    oauth_timestamp: oauth_timestamp,
    oauth_token: garminRequestOauthToken,
    oauth_verifier: garminRequestOauthVerifier,
    oauth_version: oauth_version
  };

  // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
  var oauth_encodedSignature = oauthSignature.generate(
    httpMethod,
    oauth_url,
    oauth_parameters,
    oauth_consumer_secret,
    garminRequestOauthSecret
  );
  // generates a BASE64 encode HMAC-SHA1 hash

  console.log("Signature: ", oauth_encodedSignature);

  var oauth_signature_basestring = `OAuth oauth_token="${garminRequestOauthToken}",oauth_verifier="${garminRequestOauthVerifier}",oauth_consumer_key="${oauth_consumer_key}",oauth_signature_method="${oauth_signature_method}",oauth_timestamp="${oauth_timestamp}",oauth_nonce="${oauth_nonce}",oauth_version="${oauth_version}",oauth_signature="${oauth_encodedSignature}"`;

  var oauthConfig = {
    method: httpMethod,
    url: oauth_url,
    headers: {
      Authorization: oauth_signature_basestring,
    }
  };

  console.log(oauthConfig);

  axios(oauthConfig)
    .then(function (response) {
      var garmin_response = response.data;
      console.log("Garmin Request Token Response: ", garmin_response);

      const garmin_user_token_response_array = garmin_response.split("&");
      const garmin_user_oauth_token_string = garmin_user_token_response_array[0].split("=");
      const garmin_user_oauth_token = garmin_user_oauth_token_string[1];

      const garmin_user_oauth_secret_string = garmin_user_token_response_array[1].split("=");
      const garmin_user_oauth_secret = garmin_user_oauth_secret_string[1];

      console.log("garmin_user_oauth_token: ", garmin_user_oauth_token);
      console.log("garmin_user_oauth_secret: ", garmin_user_oauth_secret);




      var m360GarminTokenUpdateURL =
        "https://sgsj8l5jj1.execute-api.us-east-1.amazonaws.com/staging/garmin";

      const m360TokenrequestBody = {
        accountId: garminAccountId,
        garminUserOauthToken: garmin_user_oauth_token,
        garminUserOauthSecret: garmin_user_oauth_secret,
        garminRequestOauthToken:garminRequestOauthToken,
        garminRequestOauthSecret:garminRequestOauthSecret
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
            body: error_description
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
        body: "Success",
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

