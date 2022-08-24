"use strict";

const AWS = require("aws-sdk");
const https = require("https");
const request = require("request");

exports.handler = function (event, context, callback) {
  const axios = require("axios");
  const qsTP = require("querystring");

  var incomingEventStringify = JSON.stringify(event);
  console.log("Incoming event: " +incomingEventStringify);

  var tp_access_token;
  var tp_authorization_bearer;
  var tpCreateWorkoutDay;
  var tpCreateWorkoutAthleteId;
  var tpCreateWorkoutTitle;

  var tpCreateWorkoutTimePlanned;
  var tpCreateWorkoutType;
  var tpCreateWorkoutStructure;

  const tpCreateWorkoutURL =
    "https://api.sandbox.trainingpeaks.com/v1/workouts/plan";

  try {
    tp_access_token = event.tpTokenData.tp_access_token;
    tp_authorization_bearer = "Bearer " + tp_access_token;

    tpCreateWorkoutAthleteId = event.tpActivityDetails[0].AthleteId + "";

    console.log("Authorization: " + tp_authorization_bearer);

    tpCreateWorkoutDay = "2021-05-05T12:40:13-06:00";

    tpCreateWorkoutTitle = "Great Run 1";

    tpCreateWorkoutTimePlanned = 1 + "";
    tpCreateWorkoutType = "run";
    tpCreateWorkoutStructure = {
      Structure: [
        {
          IntensityClass: "WarmUp",
          Name: "Warm up",
          Length: {
            Unit: "Second",
            Value: 600,
          },
          Type: "Step",
          IntensityTarget: {
            Unit: "PercentOfThresholdHr",
            Value: 75,
            MinValue: 70,
            MaxValue: 80,
          },
        },
        {
          IntensityClass: "Active",
          Name: "Active",
          Length: {
            Unit: "Second",
            Value: 2095,
          },
          Type: "Step",
          IntensityTarget: {
            Unit: "PercentOfThresholdHr",
            Value: 90,
            MinValue: 80,
            MaxValue: 100,
          },
        },
        {
          Type: "Repetition",
          Length: {
            Unit: "Repetition",
            Value: 3,
          },
          Steps: [
            {
              IntensityClass: "Active",
              Name: "Hard",
              Length: {
                Unit: "Second",
                Value: 60,
              },
              Type: "Step",
              IntensityTarget: {
                Unit: "PercentOfThresholdHr",
                Value: 115,
              },
              CadenceTarget: {
                Unit: "rpm",
                MinValue: 70,
                MaxValue: 80,
              },
            },
            {
              IntensityClass: "Rest",
              Name: "Easy",
              Length: {
                Unit: "Second",
                Value: 60,
              },
              Type: "Step",
              IntensityTarget: {
                Unit: "PercentOfThresholdHr",
                Value: 70,
              },
            },
          ],
        },
        {
          IntensityClass: "CoolDown",
          Name: "Cool Down",
          Length: {
            Unit: "Second",
            Value: 600,
          },
          Type: "Step",
          IntensityTarget: {
            Unit: "PercentOfThresholdHr",
            Value: 75,
          },
          OpenDuration: true,
        },
      ],
    };

    var tpCreateWorkoutStructureStringify = JSON.stringify(
      tpCreateWorkoutStructure.Structure
    );

    var tpCreateWorkoutStructureFormatted = tpCreateWorkoutStructureStringify
      .replace(/\\"/g, '"')
      .replace(/"/g, '\\"');

    tpCreateWorkoutStructureFormatted =
      '"' + tpCreateWorkoutStructureFormatted + '"';

    //console.log(tpCreateWorkoutStructureFormatted);

    //var tpCreateWorkoutBody = "{\"AthleteId\":"+ tpCreateWorkoutAthleteId+",\"Title\":"+ tpCreateWorkoutTitle+",\"WorkoutDay\":"+ tpCreateWorkoutDay+",\"TotalTimePlanned\":"+ tpCreateWorkoutTimePlanned+",\"WorkoutType\":"+ tpCreateWorkoutType+",\"Structure\":"+ tpCreateWorkoutStructureStringify +"};";

    var tpCreateWorkoutBody = {
      AthleteId: tpCreateWorkoutAthleteId,
      Title: tpCreateWorkoutTitle,
      WorkoutDay: tpCreateWorkoutDay,
      TotalTimePlanned: tpCreateWorkoutTimePlanned,
      WorkoutType: tpCreateWorkoutType,
      Structure: 99999999,
    };

    var tpCreateWorkoutBodyStringify = JSON.stringify(tpCreateWorkoutBody);
    console.log(typeof tpCreateWorkoutBodyStringify);
    tpCreateWorkoutBodyStringify = tpCreateWorkoutBodyStringify.replace(
      "99999999",
      tpCreateWorkoutStructureFormatted
    );
    //console.log("Create Workout Request Body :" + tpCreateWorkoutBodyStringify);
    //console.log("qsTP: "+qsTP.stringify(tpCreateWorkoutBodyStringify))

    const options = {
      url: tpCreateWorkoutURL,
      headers: {
        "content-type": "application/json",
        Authorization: tp_authorization_bearer,
      },

      body: tpCreateWorkoutBodyStringify,
    };

    request.post(options, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(JSON.parse(body));
    });
  } catch (error) {
    console.log("TP Create Workout Error: ", error);
    const errorDescription = {
      statusCode: 400,
      statusDescription: error,
    };
    var errorResponse = {
      body: JSON.stringify(errorDescription),
    };
    return errorResponse;
  }
};
