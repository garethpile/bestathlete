module.exports = {
    mutation: `mutation createACTIVITIESSTRAVA($input: CreateACTIVITIESSTRAVAInput!) {
      createACTIVITIESSTRAVA(input: $input) {
        id
        StravaActivityAverageCadence
        StravaActivityAverageHeartRate
        StravaActivityAverageSpeed
        StravaActivityAvergeTemp
        StravaActivityCalories
        StravaActivityDate
        StravaActivityDescription
        StravaActivityDistance
        StravaActivityElevationGain
        StravaActivityId
        StravaActivityLocation
        StravaActivityMovingTime
        StravaActivityOwnerId
        StravaActivitySufferScore
        StravaActivityType
      }
    }
  `
}