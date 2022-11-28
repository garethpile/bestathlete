import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class TrainingDays {
  readonly MondayTrain?: boolean | null;
  readonly MondayTrainHours?: number | null;
  readonly TuesdayTrain?: boolean | null;
  readonly TuesdayTrainHours?: number | null;
  readonly WednesdayTrain?: boolean | null;
  readonly WednesdayTrainHours?: number | null;
  readonly ThursdayTrain?: boolean | null;
  readonly ThursdayTrainHours?: number | null;
  readonly FridayTrain?: boolean | null;
  readonly FridayTrainHours?: number | null;
  readonly SaturdayTrain?: boolean | null;
  readonly SaturdayTrainHours?: number | null;
  readonly SundayTrain?: boolean | null;
  readonly SundayTrainHours?: number | null;
  constructor(init: ModelInit<TrainingDays>);
}

export declare class NonTrainingPeriod {
  readonly NonTrainingPeriodId?: string | null;
  readonly valid?: boolean | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
  constructor(init: ModelInit<NonTrainingPeriod>);
}

export declare class ThirdPartyApplications {
  readonly application: string;
  readonly applicationSync: boolean;
  readonly applicationPartyId?: string | null;
  readonly applicationRequestOauthToken?: string | null;
  readonly applicationRequestOauthSecret?: string | null;
  readonly applicationUserOauthToken?: string | null;
  readonly applicationUserOauthSecret?: string | null;
  readonly applicationUserOauthRefreshToken?: string | null;
  readonly applicationUserOauthTokenExpiryDate?: string | null;
  constructor(init: ModelInit<ThirdPartyApplications>);
}

type ACTIVITIESGARMINMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CUSTOMER3RDPARTYMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ACTIVITIESTPMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ACTIVITIES360DSLMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ACTIVITIES360DSLCUSTOMER360DSLMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CUSTOMER360DSLMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ACTIVITIESSTRAVAMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NonTrainingDaysMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EventsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ACTIVITIESGARMIN {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly GarminAccountId?: string | null;
  readonly GarminActivityId?: string | null;
  readonly GarminActivityDescription?: string | null;
  readonly GarminActivityType?: string | null;
  readonly GarminActivityStartTime?: number | null;
  readonly GarminActivityDistance?: number | null;
  readonly GarminActivityDuration?: number | null;
  readonly GarminAveragePaceInMinutesPerKilometer?: number | null;
  readonly GarminActiveKilocalories?: number | null;
  readonly GarminAverageHeartRateInBeatsPerMinute?: number | null;
  readonly GarminActivity?: string | null;
  readonly GarminActivityRPE?: number | null;
  readonly GarminActivityFatigue?: number | null;
  readonly GarminActivityAthleteFeedback?: boolean | null;
  readonly GarminActivityAthleteEffort?: string | null;
  readonly GarminActivityAthleteBody?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ACTIVITIESGARMIN, ACTIVITIESGARMINMetaData>);
  static copyOf(source: ACTIVITIESGARMIN, mutator: (draft: MutableModel<ACTIVITIESGARMIN, ACTIVITIESGARMINMetaData>) => MutableModel<ACTIVITIESGARMIN, ACTIVITIESGARMINMetaData> | void): ACTIVITIESGARMIN;
}

export declare class CUSTOMER3RDPARTY {
  readonly id: string;
  readonly Application: string;
  readonly ApplicationSync: boolean;
  readonly ApplicationRefreshToken?: string | null;
  readonly ApplicationTokenExpiryDate?: string | null;
  readonly ApplicationAccessToken?: string | null;
  readonly customer360dslID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CUSTOMER3RDPARTY, CUSTOMER3RDPARTYMetaData>);
  static copyOf(source: CUSTOMER3RDPARTY, mutator: (draft: MutableModel<CUSTOMER3RDPARTY, CUSTOMER3RDPARTYMetaData>) => MutableModel<CUSTOMER3RDPARTY, CUSTOMER3RDPARTYMetaData> | void): CUSTOMER3RDPARTY;
}

export declare class ACTIVITIESTP {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly TPActivityId: string;
  readonly TPActivityOwnerId: string;
  readonly TPActivityDescription: string;
  readonly TPActivityType: string;
  readonly TPActivityDate: string;
  readonly TPActivityMovingTime: number;
  readonly TPActivityDistance: number;
  readonly TPActivityAverageHeartRate?: number | null;
  readonly TPActivityTSS?: number | null;
  readonly TPActivityCalories?: number | null;
  readonly TPActivityElevationGain?: number | null;
  readonly TPActivityAverageSpeed?: number | null;
  readonly TPActivityAverageCadence?: number | null;
  readonly TPActivityAverageTemp?: number | null;
  readonly TPActivityLocation?: string | null;
  readonly TPActivity?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ACTIVITIESTP, ACTIVITIESTPMetaData>);
  static copyOf(source: ACTIVITIESTP, mutator: (draft: MutableModel<ACTIVITIESTP, ACTIVITIESTPMetaData>) => MutableModel<ACTIVITIESTP, ACTIVITIESTPMetaData> | void): ACTIVITIESTP;
}

export declare class ACTIVITIES360DSL {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly ActivityDescription: string;
  readonly ActivityType: string;
  readonly ActivityDate: string;
  readonly ActivityMovingTime: number;
  readonly ActivityDistance: number;
  readonly ActivityAverageHeartRate?: number | null;
  readonly ActivityStressScore?: number | null;
  readonly ActivityCalories?: number | null;
  readonly ActivityElevationGain?: number | null;
  readonly ActivityAverageSpeed?: number | null;
  readonly ActivityAverageCadence?: number | null;
  readonly ActivityAverageTemp?: number | null;
  readonly ActivityLocation?: string | null;
  readonly ActivityRPE?: number | null;
  readonly ActivityFatigueLevel?: string | null;
  readonly ActivityPhysicalLevel?: string | null;
  readonly ActivityStravaActivityId?: string | null;
  readonly ActivityStravaOwnerId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ACTIVITIES360DSL, ACTIVITIES360DSLMetaData>);
  static copyOf(source: ACTIVITIES360DSL, mutator: (draft: MutableModel<ACTIVITIES360DSL, ACTIVITIES360DSLMetaData>) => MutableModel<ACTIVITIES360DSL, ACTIVITIES360DSLMetaData> | void): ACTIVITIES360DSL;
}

export declare class ACTIVITIES360DSLCUSTOMER360DSL {
  readonly id: string;
  readonly activities360dslID: string;
  readonly customer360dslID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ACTIVITIES360DSLCUSTOMER360DSL, ACTIVITIES360DSLCUSTOMER360DSLMetaData>);
  static copyOf(source: ACTIVITIES360DSLCUSTOMER360DSL, mutator: (draft: MutableModel<ACTIVITIES360DSLCUSTOMER360DSL, ACTIVITIES360DSLCUSTOMER360DSLMetaData>) => MutableModel<ACTIVITIES360DSLCUSTOMER360DSL, ACTIVITIES360DSLCUSTOMER360DSLMetaData> | void): ACTIVITIES360DSLCUSTOMER360DSL;
}

export declare class CUSTOMER360DSL {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly LastName?: string | null;
  readonly FirstName?: string | null;
  readonly EmailAddress?: string | null;
  readonly MobileNumber?: string | null;
  readonly Male?: boolean | null;
  readonly DateOfBirth?: string | null;
  readonly Country?: string | null;
  readonly TrainingDays?: TrainingDays | null;
  readonly NonTrainingPeriod?: (NonTrainingPeriod | null)[] | null;
  readonly ThirdPartyApplications?: (ThirdPartyApplications | null)[] | null;
  readonly MetricsDateCapture?: string | null;
  readonly MetricSick?: string | null;
  readonly MetricInjury?: string | null;
  readonly MetricSleep?: string | null;
  readonly MetricWorkLifeBalance?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CUSTOMER360DSL, CUSTOMER360DSLMetaData>);
  static copyOf(source: CUSTOMER360DSL, mutator: (draft: MutableModel<CUSTOMER360DSL, CUSTOMER360DSLMetaData>) => MutableModel<CUSTOMER360DSL, CUSTOMER360DSLMetaData> | void): CUSTOMER360DSL;
}

export declare class ACTIVITIESSTRAVA {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly StravaActivityId: string;
  readonly StravaActivityOwnerId: string;
  readonly StravaActivityDescription: string;
  readonly StravaActivityType: string;
  readonly StravaActivityDate: string;
  readonly StravaActivityMovingTime: number;
  readonly StravaActivityDistance: number;
  readonly StravaActivityAverageHeartRate?: number | null;
  readonly StravaActivitySufferScore?: number | null;
  readonly StravaActivityCalories?: number | null;
  readonly StravaActivityElevationGain?: number | null;
  readonly StravaActivityAverageSpeed?: number | null;
  readonly StravaActivityAverageCadence?: number | null;
  readonly StravaActivityAvergeTemp?: number | null;
  readonly StravaActivityLocation?: string | null;
  readonly StravaActivity?: string | null;
  readonly StravaActivityZones?: string | null;
  readonly StravaActivityAthleteFeedback?: boolean | null;
  readonly StravaActivityRPE?: number | null;
  readonly StravaActivityFatigue?: number | null;
  readonly StravaActivityAthleteEffort?: string | null;
  readonly StravaActivityAthleteBody?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ACTIVITIESSTRAVA, ACTIVITIESSTRAVAMetaData>);
  static copyOf(source: ACTIVITIESSTRAVA, mutator: (draft: MutableModel<ACTIVITIESSTRAVA, ACTIVITIESSTRAVAMetaData>) => MutableModel<ACTIVITIESSTRAVA, ACTIVITIESSTRAVAMetaData> | void): ACTIVITIESSTRAVA;
}

export declare class NonTrainingDays {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly Valid?: boolean | null;
  readonly NonTrainingType?: string | null;
  readonly StartDate?: string | null;
  readonly EndDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<NonTrainingDays, NonTrainingDaysMetaData>);
  static copyOf(source: NonTrainingDays, mutator: (draft: MutableModel<NonTrainingDays, NonTrainingDaysMetaData>) => MutableModel<NonTrainingDays, NonTrainingDaysMetaData> | void): NonTrainingDays;
}

export declare class Events {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly EventName?: string | null;
  readonly EventDate?: string | null;
  readonly EventType?: string | null;
  readonly EventDistance?: number | null;
  readonly EventPriority?: string | null;
  readonly Description?: string | null;
  readonly GoalTime?: number | null;
  readonly GoalDistance?: number | null;
  readonly GoalPlace?: number | null;
  readonly GoalFinish?: boolean | null;
  readonly GoalPB?: boolean | null;
  readonly GoalOther?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Events, EventsMetaData>);
  static copyOf(source: Events, mutator: (draft: MutableModel<Events, EventsMetaData>) => MutableModel<Events, EventsMetaData> | void): Events;
}