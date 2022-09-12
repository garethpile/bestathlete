const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

var customer360dslId;
var queryString;
var params;

async function queryItems() {
  try {
    const data = await docClient.query(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event, context) => {
  try {
    queryString = event.queryStringParameters;
    //console.log(queryString);
    customer360dslId = queryString["customer360dslId"];

    params = {
      TableName: "360dslPartyStrava",
      IndexName: "customer360dslId-index",
      KeyConditionExpression: "customer360dslId = :customer_360dsl_Id",
      ExpressionAttributeValues: { ":customer_360dsl_Id": customer360dslId },
    };

    const data = await queryItems();

    //console.log("Query data returned: ", data);
    //console.log("Query data returned (Stringified): ", JSON.stringify(data));
    return { body: data };
  } catch (err) {
    return { error: err };
  }
};