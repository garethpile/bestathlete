module.exports = {
    mutation: `mutation createCUSTOMER360DSL($input: createCUSTOMER360DSLInput!) {
      createCUSTOMER360DSL(input: $input) {
        id
        LastName
        FirstName
        EmailAddress
        MobileNumber
        Gender
        DateOfBirth
        Country
        activities360dsls
        CUSTOMER3RDPARTIES
      }
    }
  `
}