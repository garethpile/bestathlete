////////////?=================Date By date range================

"use sctrict";

const AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
  console.log("Incoming event: ", event);
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    let garminRequestOauthToken = event.garminRequestOauthToken;

    let params;

    params = {
      TableName: "360dslPartyGarmin",
      IndexName: "garminRequestOauthToken-index",
      KeyConditionExpression: "#garminRequestOauthToken = :value",
      ExpressionAttributeNames: {
        "#garminRequestOauthToken": "garminRequestOauthToken",
      },
      ExpressionAttributeValues: {
        ":value": garminRequestOauthToken,
      },
    };

    return dynamoDb.query(params, (error, dataParam) => {
      if (error) {
        console.log("Error retrieving item: ", error);
        //return error;
        const response_error = {
          statusCode: 400,
          body: JSON.stringify({
              message: 'error'
          })
      };
      callback(response_error);

      } else {
        console.log("Retrieved  Item Payload: ", dataParam);

        //return JSON.stringify(dataParam);
        callback(null,dataParam );
      }
    });
  } catch (error) {
    console.log("Error retrieving item: ", error);
    return error;
  }
};
