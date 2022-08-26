module.exports = {
    mutation: `mutation createACTIVITIESTP($input: CreateACTIVITIESTPInput!) {
      createACTIVITIESTP(input: $input) {
        id
        TPActivityId
        TPActivityOwnerId
        TPActivityDescription
        TPActivityType
        TPActivityDate
        TPActivityMovingTime
        TPActivityDistance
        TPActivityAverageHeartRate
        TPActivityTSS
        TPActivityCalories
        TPActivityElevationGain
        TPActivityAverageSpeed
        TPActivityAverageCadence
        TPActivityAverageTemp
        TPActivityLocation
        TPActivity
      }
    }
  `
}