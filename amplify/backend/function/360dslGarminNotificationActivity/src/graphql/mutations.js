module.exports = {
  mutation: `mutation createACTIVITIESGARMIN($input: CreateACTIVITIESGARMINInput!) {
    createACTIVITIESGARMIN(input: $input) {
      id
      GarminAccountId
      GarminActivityId
      GarminActivityDescription
      GarminActivityType
      GarminActivityStartTime
      GarminActivityDistance
      GarminActivityDuration
      GarminAveragePaceInMinutesPerKilometer
  GarminActiveKilocalories
  GarminAverageHeartRateInBeatsPerMinute
      GarminActivity
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`
}

