import React, { useState, useEffect } from "react";
import "./ThreeSixtyDSL.css";
import "antd/dist/antd.min.css";
import { Row, Col } from "antd";
import { Auth } from "aws-amplify";
import { Select } from "antd";
import ThirdPartyCard from "../Components/ThirdPartyCard";

const { Option } = Select;

function ThirdParty(props) {
  let customerUserId = props.customerData.id;
  //console.log("Customer userId: ", customerUserId);

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
              <ThirdPartyCard customerData={props.customerData} />
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
