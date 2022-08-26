"use strict";

const AWS = require("aws-sdk");

const axios = require("axios");
const qsTP = require("querystring");

exports.handler = async (event, context, callback) => {
  console.log("Starting Strava Refresh Token process ......");

  var strava_refresh_token;
  var strava_party_id;

  var new_strava_access_token;
  var new_strava_refresh_token;
  var new_strava_expires_at;
  var strava_last_name;
  var strava_first_name;

  var m360dslStravaRefreshTokenResult;

  try {
    console.log(event);

    strava_party_id = event.owner_id;
    strava_refresh_token = event.stravaTokenData.Item.strava_refresh_token.S;
    strava_last_name = event.stravaTokenData.Item.LastName.S;
    strava_first_name = event.stravaTokenData.Item.FirstName.S;

    console.log("Strava Party ID: ", strava_party_id);
    console.log("Strava Refresh Token: ", strava_refresh_token);
  } catch (error) {
    console.log("Invalid incoming data: ", error);

    var errorResponse = {
      statusCode: 400,
      statusDescription: "Input parameter error: " + error,
    };

    return errorResponse;
  }

  var client_id = "7947";
  var client_secret = "471581ec88f559a66972e135ec0f59221d7de7da";
  var grant_type = "refresh_token";

  var stravaTokenRefreshURL = "https://www.strava.com/oauth/token";

  const stravaTokenRefreshBody = {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: grant_type,
    refresh_token: strava_refresh_token,
  };

  const stravaTokenRefreshConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    let stravaTokenRefreshResult = await axios.post(
      stravaTokenRefreshURL,
      qsTP.stringify(stravaTokenRefreshBody),
      stravaTokenRefreshConfig
    );

    console.log(
      "Strava Token Refresh Result Data: ",
      stravaTokenRefreshResult.data
    );

    new_strava_access_token = stravaTokenRefreshResult.data.access_token;
    new_strava_refresh_token = stravaTokenRefreshResult.data.refresh_token;
    new_strava_expires_at = stravaTokenRefreshResult.data.expires_at;

    m360dslStravaRefreshTokenResult = {
      Item: {
        PartyId: { S: strava_party_id },
        strava_expires_at: { N: new_strava_expires_at },
        strava_access_token: { S: new_strava_access_token },
        strava_refresh_token: { S: new_strava_refresh_token },
      },
    };
  } catch (error) {
    console.log("ERROR invoking Strava Token Refresh API: ", error);
    return error;
  }

  var m360dslStravaTokenUpdateURL =
    "https://46t6xlzw84.execute-api.eu-west-1.amazonaws.com/dev/strava";

  const m360dslTokenUpdateConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const m360dslTokenUpdateBody = {
    PartyId: strava_party_id,
    strava_access_token: new_strava_access_token,
    strava_refresh_token: new_strava_refresh_token,
    strava_expires_at: new_strava_expires_at,
    LastName:strava_last_name,
    FirstName:strava_first_name
  };

  try {
    let m360dslTokenUpdateResult = await axios.post(
      m360dslStravaTokenUpdateURL,
      m360dslTokenUpdateBody,
      m360dslTokenUpdateConfig
    );

    console.log(
      "m360 TOKEN UPDATE RESULT.DATA: ",
      m360dslTokenUpdateResult.data
    );

    console.log("Strava Refresh Response: ", m360dslStravaRefreshTokenResult);

    console.log("Types");

    console.log(typeof m360dslTokenUpdateResult.data);
    console.log(typeof m360dslStravaRefreshTokenResult);

    return m360dslStravaRefreshTokenResult;
  } catch (error) {
    console.log("ERROR invoking m360 Token Update API: ", error);
    return error;
  }
};
