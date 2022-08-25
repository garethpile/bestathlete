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
        <a href="http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://6kjj2t9ega.execute-api.us-east-1.amazonaws.com/staging/oauthexchange">
          Connect your Strava account
        </a>
      </div>

      <div>
        <a
          href={`https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/requesttoken/?userId=${userId}`}
        >
          Connect your Garmin account
        </a>
      </div>
    </Card>
 
  );
}
