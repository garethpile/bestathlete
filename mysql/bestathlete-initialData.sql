


INSERT INTO `bestathlete`.`Customers`
(
    `idCustomer`,
    `firstName`,
    `lastName`,
    `emailAddress`,
    `gender`,
    `mobileNumber`,
    `created`,
    `lastUpdated`
)
VALUES
(
    '3926bc4f-433d-4bbd-843b-8ec2a392e62b',
    'Gareth',
    'Pile',
    'pile.gareth@gmail.com',
    'Male',
    '+27726840479',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);


INSERT INTO `bestathlete`.`Workouts`
(
    `idCustomer`,
    `workoutAthleteFeedback`,
    `workoutDescription`,
    `workoutType`,
    `workoutDistance`,
    `created`,
    `lastUpdated`
)
VALUES
(
    '3926bc4f-433d-4bbd-843b-8ec2a392e62b',
    0,
    'Morning Run',
    'Run',
    10,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO `bestathlete`.`Workouts`
(
    `idCustomer`,
    `workoutAthleteFeedback`,
    `workoutDescription`,
    `workoutType`,
    `workoutDistance`,
    `created`,
    `lastUpdated`
)
VALUES
(
    '3926bc4f-433d-4bbd-843b-8ec2a392e62b',
    0,
    'Morning Bike',
    'Bike',
    100,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO `bestathlete`.`Events`
(
`eventName`,
`eventType`,
`eventSubType`,
`eventDate`,
`eventDistance`,
`idCustomer`,
`categoryRace`,
`isValid`,
`created`
)
VALUES
(
'Johnsons Crane',
'Road Running',
'Marathon',
'2024-01-04 18:31:28',
'42.2',
'3926bc4f-433d-4bbd-843b-8ec2a392e62b',
'B',
1,
'2023-11-05 07:31:28'
);

INSERT INTO `bestathlete`.`Events`
(
`eventName`,
`eventType`,
`eventSubType`,
`eventDate`,
`eventDistance`,
`idCustomer`,
`categoryRace`,
`isValid`,
`created`
)
VALUES
(
'2 Oceans',
'Road Running',
'Marathon',
'2024-04-15 07:31:28',
'56',
'3926bc4f-433d-4bbd-843b-8ec2a392e62b',
'B',
1,
'2023-11-05 07:31:28'
);

INSERT INTO `bestathlete`.`Events`
(
`eventName`,
`eventType`,
`eventSubType`,
`eventDate`,
`eventDistance`,
`idCustomer`,
`categoryRace`,
`isValid`,
`created`
)
VALUES
(
'Comrades',
'Road Running',
'Marathon',
'2024-06-04 06:31:28',
'90',
'3926bc4f-433d-4bbd-843b-8ec2a392e62b',
'B',
1,
'2023-11-05 07:31:28'
);