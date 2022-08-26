exports.handler = async (event) => {
  var queryString;

  try {
    console.log(event);
    queryString = event.queryStringParameters;
    console.log(queryString);
  } catch (error) {
    throw new Error(
      "Error extracting querparameters from event object: ",
      error
    );
  }

  if (queryString["hub.challenge"]) {
    var challenge;

    try {
      challenge = queryString["hub.challenge"];

      //var hubchallenge = challenge['hub.challenge'];

      var bodyData = {
        "hub.challenge": challenge,
      };

      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,",
        },
        body: JSON.stringify(bodyData),
      };

      console.log(response);

      return response;

      //challenge = queryString['hub.challenge'];
      //console.log('hub.challenge: ........ ', challenge);
    } catch (err) {
      console.log("Error: ", err);

      var bodyData = {
        Error: err,
      };

      const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,",
        },
        body: JSON.stringify(bodyData),
      };

      return response;
    }
  } else {
  }
};
