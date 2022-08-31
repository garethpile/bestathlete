import React, { useState, useEffect } from "react";
import "./ThreeSixtyDSL.css";

import "antd/dist/antd.min.css";

import { Row, Col } from "antd";

import { Auth } from "aws-amplify";

import { Select } from "antd";

import ThirdPartyCard from "../Components/ThirdPartyCard";

const { Option } = Select;

function ThirdParty() {
  const [userId, setUserId] = useState("");
  // const { loading, error, data } = useQuery(firstQuery)

  useEffect(() => {
    // Obtain current logged in Amplify user userId which needs to be passed into Garmin URL later
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        // userId = user.username;
        setUserId(user.username);
        console.log("Current userId: ", user); // This works and userId visible ...
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* <Header user={userId} /> */}
      <div className="bodyDiv">
        <Row>
          <Col
            className="firstCol"
            span={8}
            xs={24}
            sm={24}
            lg={8}
            xl={8}
          ></Col>
          <Col className="secondCol" span={8} xs={24} sm={24} lg={8} xl={8}>
            <h1
              style={{
                justifyContent: "center",
                display: "flex",
                color: "crimson",
              }}
            >
              Connect Third Parties
            </h1>

            <div className="cardSpacingDiv">
              <ThirdPartyCard userId={userId} />
            </div>
          </Col>

          <Col className="thirdCol" span={8} xs={24} sm={24}>
            <div
              style={{
                marginRight: "40px",
                marginTop: "35px",
                marginLeft: "40px",
              }}
            ></div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ThirdParty;
