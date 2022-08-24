// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ACTIVITIESGARMIN, CUSTOMER3RDPARTY, ACTIVITIESTP, ACTIVITIES360DSL, ACTIVITIES360DSLCUSTOMER360DSL, CUSTOMER360DSL, ACTIVITIESSTRAVA, TrainingDays, NonTrainingPeriod, ThirdPartyApplications } = initSchema(schema);

export {
  ACTIVITIESGARMIN,
  CUSTOMER3RDPARTY,
  ACTIVITIESTP,
  ACTIVITIES360DSL,
  ACTIVITIES360DSLCUSTOMER360DSL,
  CUSTOMER360DSL,
  ACTIVITIESSTRAVA,
  TrainingDays,
  NonTrainingPeriod,
  ThirdPartyApplications
};