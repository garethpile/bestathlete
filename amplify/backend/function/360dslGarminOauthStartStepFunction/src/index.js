var aws = require("aws-sdk");
exports.handler = (event, context, callback) => {
 
  var garminRequestOauthToken;
  var garminRequestOauthVerifier;

  let eventData = JSON.parse(JSON.stringify(event));

  console.log("Event data: ", eventData);

  try {
    garminRequestOauthToken = eventData.queryStringParameters.oauth_token;
    garminRequestOauthVerifier = eventData.queryStringParameters.oauth_verifier;
  } catch (error) {
    return error;
  }

  console.log("garminRequestOauthToken: ", garminRequestOauthToken);
  console.log("garminRequestOauthVerifier: ", garminRequestOauthVerifier);

  garminRequestOauthToken = garminRequestOauthToken + "";
  garminRequestOauthVerifier = garminRequestOauthVerifier + "";

  var params = {
    stateMachineArn:
      "arn:aws:states:us-east-1:287509267405:stateMachine:GarminOauth",
    input: `
    {
      \"garminRequestOauthToken\" : \"${garminRequestOauthToken}\",
      \"garminRequestOauthVerifier\" : \"${garminRequestOauthVerifier}\"
    }
    `,
  };

  console.log("Step Function Input: ", params);

  var stepfunctions = new aws.StepFunctions();

  stepfunctions.startExecution(params, (err, data) => {
    if (err) {
      console.log("Step Function Error: ", err);
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: "There was an error",
        }),
      };
      callback(null, response);
    } else {
      console.log("Step Function Success: ", data);

      const success_response = {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: `<meta http-equiv="refresh" content="0; url='https://main.d2ehwfu8n9t09f.amplifyapp.com/'" />`,
      };

      callback(null, success_response);
    }
  });
};

