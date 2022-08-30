import React from "react";
import { Card } from "antd";


export default function ThirdPartyCard(userId) {
   
  return (
   

    <Card className="maincardDiv">
      <b
        style={{
          justifyContent: "left",
          display: "flex",
          color: "crimson",
        }}
      >
        Third Party Applications
      </b>
      <p></p>
      <div>
        <a href="https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize?client_id=m360&response_type=code&scope=workouts athlete:profile&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/tpnotification">
          Connect your TP account
        </a>
      </div>
      <div>
        <a href="http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://yqx445glt7.execute-api.eu-west-1.amazonaws.com/prod/oauthexchange">
          Connect your Strava account
        </a>
      </div>

      <div>
        <a
          href={` https://r4hp85viv4.execute-api.eu-west-1.amazonaws.com/prod/?userId=${userId}`}
        >
          Connect your Garmin account
        </a>
      </div>
    </Card>
 
  );
}
