"use strict";

const axios = require("axios");
const qsTP = require("querystring");

exports.handler = async (event, context, callback) => {
  //console.log("Starting TP Refresh Token process ......");

  var tp_refresh_token;
  var tp_lastname;
  var tp_firstname;
  var tp_emailaddress;
  

  var m360dslTPTokenUpdateBody;

  try {
    console.log(event);

    tp_refresh_token = event.tpTokenData.Item.tp_refresh_token.S;
    tp_lastname = event.tpTokenData.Item.LastName.S;
    tp_firstname = event.tpTokenData.Item.FirstName.S;
    tp_emailaddress = event.tpTokenData.Item.EmailAddress.S;

    //console.log("TP Refresh Token: ", tp_refresh_token);
    //console.log("TP Last Name: ", tp_lastname);
    //console.log("TP First Name: ", tp_firstname);
    //console.log("TP Email Address: ", tp_emailaddress);
  } catch (error) {
    console.log("Invalid input parameters: ", error);

    var errorResponse = {
      statusCode: 400,
      statusDescription: "Input parameter error: " + error,
    };

    return errorResponse;
  }

  var client_id = "m360";
  var client_secret = "alnaSgMPslcwvfcV2vunOifl81AX9zciC932imPny4";
  var grant_type = "refresh_token";

  var tpTokenExchangeURL =
    "https://oauth.sandbox.trainingpeaks.com/oauth/token";
  var m360dslTPTokenUpdateURL =
    "https://sgsj8l5jj1.execute-api.us-east-1.amazonaws.com/staging/tp";

  const tpTokenExchangeBody = {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: grant_type,
    refresh_token: tp_refresh_token,
  };

  //console.log("TP Token Exchange Request Body: ", tpTokenExchangeBody);

  const tpTokenExchangeConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const m360dslTPTokenUpdateConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let tpTokenExchangeResult = await axios.post(
      tpTokenExchangeURL,
      qsTP.stringify(tpTokenExchangeBody),
      tpTokenExchangeConfig
    );

    //console.log("TP Token Exchange Result Data: ", tpTokenExchangeResult.data);

    var tp_access_token = tpTokenExchangeResult.data.access_token;
    var tp_refresh_token = tpTokenExchangeResult.data.refresh_token;
   

    var expires_in = tpTokenExchangeResult.data.expires_in;

    m360dslTPTokenUpdateBody = {
      tp_access_token: tp_access_token,
      tp_refresh_token: tp_refresh_token,
      LastName: tp_lastname,
      FirstName: tp_firstname,
      EmailAddress: tp_emailaddress,
      tp_expires_in: expires_in
    };
  } catch (error) {
    let errorMessage = "ERROR invoking TP Token Exchange Post:  " + error;
    console.log(errorMessage);
    return errorMessage;
  }

  try {
    let m360Result = await axios.post(
      m360dslTPTokenUpdateURL,
      m360dslTPTokenUpdateBody,
      m360dslTPTokenUpdateConfig
    );

    //console.log("m360 Token Update Result Data: ", m360Result.data);

    //console.log(m360dslTPTokenUpdateBody);
    return m360dslTPTokenUpdateBody;


  } catch (error) {
    let errorMessage = "ERROR invoking m360 TP Token Update Post: " + error;
    console.log(errorMessage);
    return errorMessage;
  }
};
