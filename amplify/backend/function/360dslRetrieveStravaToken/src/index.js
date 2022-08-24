"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const atob = require("atob");

module.exports = (event, callback) => {
  var owner_id = "";
  let eventData = JSON.parse(JSON.stringify(event));

  try {
    owner_id = eventData.owner_id;
  } catch (err) {
    throw new Error("owner_id not present.");
  }

  //console.log("Strava Owner ID: ", owner_id);

  // Retrieve Strava Token .....
  var params = {
    TableName: "360dslPartyStrava",
    Key: { PartyId: owner_id },
  };

  return dynamoDb.get(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, data.Item);
  });
};

