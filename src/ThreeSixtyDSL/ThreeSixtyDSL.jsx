import React, { useState, useEffect } from "react";
import "./ThreeSixtyDSL.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import "antd/dist/antd.min.css";
import { Avatar } from "antd";
import { Card } from "antd";
import Divider from "@mui/material/Divider";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Row, Col } from "antd";
import { Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { Activityquery } from "../Apollo/queries";
import { Select } from "antd";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TermsConditions from "../Components/TermsConditions";
import AthleteFeedback from "../Components/AthleteFeedback";
import ThirdPartyCard from "../Components/ThirdPartyCard";
import AthleteCard from "../Components/AthleteCard";
import ActivityCard from "../Components/ActivityCard";
import Header from "../Components/Header";
const { Option } = Select;

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? ":" : "") : "";
  return hDisplay + mDisplay + sDisplay;
}

function MinPerKmFraction(MinPerKm, GarminActivityType) {
  switch (GarminActivityType) {
    case "LAP_SWIMMING":
      MinPerKm = Number(MinPerKm);
      var SecPerHundred = (MinPerKm / 10) * 60;
      var Mins = Math.floor(SecPerHundred / 60);
      var Secs = Math.floor(SecPerHundred - Mins * 60);
      return Mins + ":" + Secs;
    case "STRENGTH_TRAINING":
      return "-";
    case "RUNNING": {
      MinPerKm = Number(MinPerKm);
      var mins = Math.floor(MinPerKm / 1);
      var fraction = Math.floor((MinPerKm - mins) * 60);
      return mins + ":" + fraction;
    }
    case "CYCLING":
      MinPerKm = Number(MinPerKm);
      var KmPerHr = (1 / MinPerKm) * 60;
      return KmPerHr.toFixed(2);
    case "VIRTUAL_RIDE":
      MinPerKm = Number(MinPerKm);
      var KmPerHr = (1 / MinPerKm) * 60;
      return KmPerHr.toFixed(2);
    default:
      return "-";
  }
}

function ThreeSixtyDSL(props) {


//console.log("CustomerVersion (ThreeSixtyDSL) " + props.customerDataVersion);

  const [activities, setActivities] = React.useState([]);

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

  const sortDesByDate = (a, b) => {
    if (new Date(a.updatedAt) > new Date(b.updatedAt)) {
      return -1;
    }
    if (new Date(a.updatedAt) < new Date(b.updatedAt)) {
      return 1;
    }
    return 0;
  };
  async function fetchActivities() {
    try {
      const activity = await API.graphql(graphqlOperation(Activityquery));
      console.log("Activity items returned:" + activity.data.activitiesgarminByGarminAccountId.items);
      let sorted =
        activity.data.activitiesgarminByGarminAccountId.items.sort(
          sortDesByDate
        );
      sorted = sorted.filter(
        (exr) =>
          !exr.GarminActivityAthleteFeedback ||
          exr.GarminActivityAthleteFeedback != 1
      );
      setActivities(sorted.slice(0, 10));
    } catch (err) {
      console.log("Error fetching activities");
    }
  }
  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <div>
      {/* <Header user={userId} /> */}
      <div className="bodyDiv">
        <Row>
          <Col className="firstCol" span={8} xs={24} sm={24} lg={8} xl={8}>
          <h1
              style={{
                justifyContent: "center",
                display: "flex",
                color: "crimson",
                marginTop:"15px"
              }}
            >
              Activity Feedback Corner
            </h1>
            <AthleteCard customerData={props.customerData}/>
          <TermsConditions/>
          </Col>
          <Col className="secondCol" span={8} xs={24} sm={24} lg={8} xl={8}>
           
            {activities.map(
              ({
                id,
                GarminActivityId,
                GarminActivityType,
                GarminActivityDescription,
                GarminAveragePaceInMinutesPerKilometer,
                GarminActivityStartTime,
                GarminActivityDuration,
                GarminActivityDistance,
                GarminAverageHeartRateInBeatsPerMinute,
                GarminActivityAthleteBody,
                GarminActivityAthleteEffort,
                _version
              }) => {
                return (
                  <div key={id} className="cardSpacingDiv">
                    <ActivityCard
                      id={id}
                      version={_version}
                      GarminActivityType={GarminActivityType}
                      GarminActivityDescription={GarminActivityDescription}
                      GarminAveragePaceInMinutesPerKilometer={
                        GarminAveragePaceInMinutesPerKilometer
                      }
                      fetcchActivity={fetchActivities}
                      GarminActivityStartTime={GarminActivityStartTime}
                      GarminActivityDuration={GarminActivityDuration}
                      GarminActivityDistance={GarminActivityDistance}
                      GarminAverageHeartRateInBeatsPerMinute={
                        GarminAverageHeartRateInBeatsPerMinute
                      }
                      GarminActivityAthleteBody={GarminActivityAthleteBody}
                      GarminActivityAthleteEffort={GarminActivityAthleteEffort}
                    />
                  </div>
                );
              }
            )}
          </Col>

          <Col className="thirdCol" span={8} xs={24} sm={24}>
            <AthleteFeedback userId={userId} customerData={props.customerData}/>
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

export default ThreeSixtyDSL;
