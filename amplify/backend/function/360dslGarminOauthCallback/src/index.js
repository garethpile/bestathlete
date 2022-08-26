

exports.handler = async (event) => {

    const success_response = {
        "statusCode": 200,
        "headers": {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        },
        "body": "Hello from 360dsl!"
      };
      callback (null, success_response);
};
