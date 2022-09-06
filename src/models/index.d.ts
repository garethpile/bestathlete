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
  constructor(init: ModelInit<ACTIVITIESGARMIN>);
  static copyOf(source: ACTIVITIESGARMIN, mutator: (draft: MutableModel<ACTIVITIESGARMIN>) => MutableModel<ACTIVITIESGARMIN> | void): ACTIVITIESGARMIN;
}

export declare class CUSTOMER3RDPARTY {
  readonly id: string;
  readonly Application: string;
  readonly ApplicationSync: boolean;
  readonly ApplicationRefreshToken?: string | null;
  readonly ApplicationTokenExpiryDate?: string | null;
  readonly ApplicationAccessToken?: string | null;
  readonly customer360dslID?: string | null;
  constructor(init: ModelInit<CUSTOMER3RDPARTY>);
  static copyOf(source: CUSTOMER3RDPARTY, mutator: (draft: MutableModel<CUSTOMER3RDPARTY>) => MutableModel<CUSTOMER3RDPARTY> | void): CUSTOMER3RDPARTY;
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
  readonly ACTIVITIES360DSL?: ACTIVITIES360DSL | null;
  readonly TPActivityLocation?: string | null;
  readonly TPActivity?: string | null;
  constructor(init: ModelInit<ACTIVITIESTP>);
  static copyOf(source: ACTIVITIESTP, mutator: (draft: MutableModel<ACTIVITIESTP>) => MutableModel<ACTIVITIESTP> | void): ACTIVITIESTP;
}

export declare class ACTIVITIES360DSL {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly ActivityDescription: string;
  readonly ActivityType: string;
  readonly ActivityDate: string;
  readonly ActivityMovingTime: number;
  readonly ActivityDistance: number;
  readonly ACTIVITIES360DSLCUSTOMER360DSLS?: (ACTIVITIES360DSLCUSTOMER360DSL | null)[] | null;
  readonly ACTIVITIESSTRAVA?: ACTIVITIESSTRAVA | null;
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
  constructor(init: ModelInit<ACTIVITIES360DSL>);
  static copyOf(source: ACTIVITIES360DSL, mutator: (draft: MutableModel<ACTIVITIES360DSL>) => MutableModel<ACTIVITIES360DSL> | void): ACTIVITIES360DSL;
}

export declare class ACTIVITIES360DSLCUSTOMER360DSL {
  readonly id: string;
  readonly activities360dsl: ACTIVITIES360DSL;
  readonly customer360dsl: CUSTOMER360DSL;
  constructor(init: ModelInit<ACTIVITIES360DSLCUSTOMER360DSL>);
  static copyOf(source: ACTIVITIES360DSLCUSTOMER360DSL, mutator: (draft: MutableModel<ACTIVITIES360DSLCUSTOMER360DSL>) => MutableModel<ACTIVITIES360DSLCUSTOMER360DSL> | void): ACTIVITIES360DSLCUSTOMER360DSL;
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
  readonly activities360dsls?: (ACTIVITIES360DSLCUSTOMER360DSL | null)[] | null;
  readonly CUSTOMER3RDPARTIES?: (CUSTOMER3RDPARTY | null)[] | null;
  constructor(init: ModelInit<CUSTOMER360DSL>);
  static copyOf(source: CUSTOMER360DSL, mutator: (draft: MutableModel<CUSTOMER360DSL>) => MutableModel<CUSTOMER360DSL> | void): CUSTOMER360DSL;
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
  constructor(init: ModelInit<ACTIVITIESSTRAVA>);
  static copyOf(source: ACTIVITIESSTRAVA, mutator: (draft: MutableModel<ACTIVITIESSTRAVA>) => MutableModel<ACTIVITIESSTRAVA> | void): ACTIVITIESSTRAVA;
}