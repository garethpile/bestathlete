import React, { useState, useEffect } from "react";
import "./ThreeSixtyDSL.css";
import "antd/dist/antd.min.css";
import { Row, Col } from "antd";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { Activityquery } from "../Apollo/queries";
import TermsConditions from "../Components/TermsConditions";
import AthleteFeedback from "../Components/AthleteFeedback";
import AthleteCard from "../Components/AthleteCard";
import ActivityCard from "../Components/ActivityCard";

function ThreeSixtyDSL(props) {
  const [activities, setActivities] = React.useState([]);

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
      console.log(
        "Activity items returned:" +
          activity.data.activitiesgarminByGarminAccountId.items
      );
      let sorted =
        activity.data.activitiesgarminByGarminAccountId.items.sort(
          sortDesByDate
        );
      sorted = sorted.filter(
        (exr) =>
          !exr.GarminActivityAthleteFeedback ||
          exr.GarminActivityAthleteFeedback !== 1
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
                marginTop: "15px",
              }}
            >
              Activity Feedback Corner
            </h1>
            <AthleteCard customerData={props.customerData} />
            <TermsConditions />
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
                _version,
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
            <AthleteFeedback customerData={props.customerData} />
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
