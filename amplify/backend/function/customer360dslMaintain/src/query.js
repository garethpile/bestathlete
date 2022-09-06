module.exports = {
    mutation:`mutation CreateACTIVITIES360DSL($input: CreateACTIVITIES360DSLInput!) {
    createACTIVITIES360DSL(input: $input) {
      id
      UserId360DSL
      ActivityDescription
      ActivityType
      ActivityDate
      ActivityMovingTime
      ActivityDistance
      ActivityAverageHeartRate
      ActivityStressScore
      ActivityCalories
      ActivityElevationGain
      ActivityAverageSpeed
      ActivityAverageCadence
      ActivityAverageTemp
      ActivityLocation
      ActivityRPE
      ActivityFatigueLevel
      ActivityPhysicalLevel
      ActivityStravaActivityId
      ActivityStravaOwnerId   
    }
  }
`
}