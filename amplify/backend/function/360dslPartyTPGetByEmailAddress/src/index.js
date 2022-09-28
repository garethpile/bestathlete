const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

var customer360dsl_EmailAddress;
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
    customer360dsl_EmailAddress = queryString["emailAddress"];

    params = {
      TableName: "360dslPartyTP",
      IndexName: "EmailAddress-index",
      KeyConditionExpression: "EmailAddress = :customer_360dsl_EmailAddress",
      ExpressionAttributeValues: { ":customer_360dsl_EmailAddress": customer360dsl_EmailAddress },
    };

    const data = await queryItems();

    //console.log("Query data returned: ", data);
    //console.log("Query data returned (Stringified): ", JSON.stringify(data));
    return { body: data };
  } catch (err) {
    return { error: err };
  }
};
