

exports.handler = async (event) => {
    console.log(event);
  
    var oauth_token_string = event.oauth_token + "";
    var oauth_verifier_string = event.oauth_verifier + "";
  
    var params = {
      oauth_token: oauth_token_string,
      oauth_verifier: oauth_verifier_string,
    };
  
    return params;
  };
