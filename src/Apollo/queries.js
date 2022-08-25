export const Activityquery = `query MyQuery {

    activitiesgarminByGarminAccountId(GarminAccountId: "574dc5ad1b54a9fe210170d1fd34741c",filter: {GarminActivityAthleteFeedback: {eq: false}}) {
  
      nextToken
  
      startedAt
  
      items {
  
        id
        
        GarminAccountId
  
        GarminActiveKilocalories
  
        GarminActivity
  
        GarminActivityDescription
  
        GarminActivityDistance
  
        GarminActivityDuration
  
        GarminActivityId
  
        GarminActivityStartTime
  
        GarminActivityType
  
        GarminAverageHeartRateInBeatsPerMinute
  
        GarminAveragePaceInMinutesPerKilometer

        GarminActivityAthleteFeedback

        updatedAt

        _version
  
      }
  
    }
  
  }`;

export const updateGarminActivity = `
  mutation MyMutation ($id: ID!, $GarminActivityAthleteBody: String, $GarminActivityAthleteEffort: String, $GarminActivityAthleteFeedback: Boolean,  $_version: Int) {
    updateACTIVITIESGARMIN(input : {id: $id, GarminActivityAthleteBody: $GarminActivityAthleteBody, GarminActivityAthleteEffort: $GarminActivityAthleteEffort, GarminActivityAthleteFeedback:$GarminActivityAthleteFeedback,_version: $_version}) {
      GarminActivityAthleteEffort
      GarminActivityAthleteBody
      GarminActivityAthleteFeedback
    }
  }`;

  export const updateNonTrainingDays = `
  mutation MyMutation ($id: ID!, $startDate: AWSDate!, $endDate: AWSDate!, $valid: Boolean!, $EmailAddress : String!, $_version: Int) {
    updateCUSTOMER360DSL(condition: {EmailAddress: {eq: $EmailAddress}},input : {id: $id, NonTrainingPeriod: {endDate: $endDate, startDate: $startDate, valid: $valid} ,_version: $_version}) {
      NonTrainingPeriod {
        endDate
        startDate
        valid
      }
    }
  }`;

export const getCustomerByID = `query myCustomerQuery($id: ID!) {
    getCUSTOMER360DSL(id: $id) {
    CUSTOMER3RDPARTIES {
    items {
      _version
    }
    }
       id
       UserId360DSL
       LastName
       FirstName
       EmailAddress
       MobileNumber
       Male
       DateOfBirth
       Country
       TrainingDays {
           MondayTrain
           MondayTrainHours
           TuesdayTrain
           TuesdayTrainHours
           WednesdayTrain
           WednesdayTrainHours
           ThursdayTrain
           ThursdayTrainHours
           FridayTrain
           FridayTrainHours
           SaturdayTrain
           SaturdayTrainHours
           SundayTrain
           SundayTrainHours
       }
       MetricsDateCapture
       MetricInjury
       MetricSleep
       MetricWorkLifeBalance
       _version
      NonTrainingPeriod {
        endDate
        startDate
        valid
      }
      TrainingDays {
      FridayTrain
      FridayTrainHours
      MondayTrain
      MondayTrainHours
      SaturdayTrain
      WednesdayTrainHours
      WednesdayTrain
      TuesdayTrainHours
      TuesdayTrain
      ThursdayTrainHours
      ThursdayTrain
      SundayTrainHours
      SundayTrain
      SaturdayTrainHours
      }
      }
    }`;

// input CreateCUSTOMER360DSLInput {
//   id: ID
//   UserId360DSL: String
//   LastName: String!
//   FirstName: String!
//   EmailAddress: AWSEmail!
//   MobileNumber: AWSPhone!
//   Male: Boolean!
//   DateOfBirth: AWSDate!
//   Country: String
//   TrainingDays: TrainingDaysInput
//   NonTrainingPeriod: [NonTrainingPeriodInput]
//   ThirdPartyApplications: [ThirdPartyApplicationsInput]
//   MetricsDateCapture: AWSDate
//   MetricInjury: String
//   MetricSleep: String
//   MetricWorkLifeBalance: String
//   _version: Int
// }
// type TrainingDaysInput {
//   MondayTrain: Boolean
//   MondayTrainHours: Int
//   TuesdayTrain: Boolean
//   TuesdayTrainHours: Int
//   WednesdayTrain: Boolean
//   WednesdayTrainHours: Int
//   ThursdayTrain: Boolean
//   ThursdayTrainHours: Int
//   FridayTrain: Boolean
//   FridayTrainHours: Int
//   SaturdayTrain: Boolean
//   SaturdayTrainHours: Int
//   SundayTrain: Boolean
//   SundayTrainHours: Int
// }

export const createCustomer360DSL = `mutation createCustomerMutation($id: ID!, $EmailAddress: AWSEmail!, $FirstName: String!, $LastName: String!, $MobileNumber: AWSPhone!, $Male: Boolean!, $DateOfBirth: AWSDate!, $Country: String!,$MondayTrain: Boolean! ,  $MondayTrainHours: Int ,  $TuesdayTrain: Boolean! ,  $TuesdayTrainHours: Int ,  $WednesdayTrain: Boolean! ,$WednesdayTrainHours: Int ,  $ThursdayTrain: Boolean! , $ThursdayTrainHours: Int , $FridayTrain: Boolean! ,$FridayTrainHours: Int , $SaturdayTrain: Boolean! , $SaturdayTrainHours: Int ,$SundayTrain: Boolean! ,  $SundayTrainHours: Int ){
  createCUSTOMER360DSL(input: {
    id : $id,
    EmailAddress: $EmailAddress,
    FirstName: $FirstName,
    LastName: $LastName,
    MobileNumber: $MobileNumber,
    Male: $Male,
    DateOfBirth : $DateOfBirth,
    Country : $Country,
    TrainingDays: {
      MondayTrain: $MondayTrain,
      MondayTrainHours: $MondayTrainHours,
      TuesdayTrain: $TuesdayTrain,
      TuesdayTrainHours: $TuesdayTrainHours,
      WednesdayTrain: $WednesdayTrain,
      WednesdayTrainHours: $WednesdayTrainHours,
      ThursdayTrain: $ThursdayTrain,
      ThursdayTrainHours: $ThursdayTrainHours,
      FridayTrain: $FridayTrain,
      FridayTrainHours: $FridayTrainHours,
      SaturdayTrain: $SaturdayTrain,
      SaturdayTrainHours: $SaturdayTrainHours,
      SundayTrain: $SundayTrain,
      SundayTrainHours: $SundayTrainHours
    }

  }
    ){
    EmailAddress
    id
  }
}`;

export const updateAthleteMetricsMutation = `mutation updateAthleteMetricsMutation 
(
    $id:ID!, 
    $MetricsDateCapture: AWSDate
    $MetricInjury: String
    $MetricSleep: String
    $MetricSick: String
    $MetricWorkLifeBalance: String,
    $_version : Int
) 
  
{
  updateCUSTOMER360DSL(
    input: {
            id: $id, 
            MetricsDateCapture: $MetricsDateCapture
            MetricInjury: $MetricInjury
            MetricSleep: $MetricSleep
            MetricSick: $MetricSick
            MetricWorkLifeBalance: $MetricWorkLifeBalance         
            _version: $_version
    }
  ) {
    MetricsDateCapture
    MetricInjury
    MetricSleep
    MetricSick
    MetricWorkLifeBalance
    _version
  }
}`;
