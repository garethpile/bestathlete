import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  Card,
  MenuItem,
  Button,
  Grid,
  FormControlLabel,
  InputLabel,
  FormControl,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import CountryList from "./ContryList";
import "./Profile.css";
import { Box } from "@mui/system";
import { API, graphqlOperation } from "aws-amplify";
import { updateCustomer360DSL } from "../Apollo/queries";
import { useLocation } from "react-router-dom";

export default function Profile(props) {
  //const Profile = ({setRedirect}) => {

  const [customer, setCustomer] = useState({
    id: "",
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    gender: "",
    MobileNumber: "",
    Country: "",
    DateOfBirth: "",
    SaturdayTrain: true,
    SundayTrain: true,
    MondayTrain: true,
    TuesdayTrain: true,
    WednesdayTrain: true,
    ThursdayTrain: true,
    FridayTrain: true,
    SaturdayTrainHours: 1,
    SundayTrainHours: 1,
    MondayTrainHours: 1,
    TuesdayTrainHours: 1,
    WednesdayTrainHours: 1,
    ThursdayTrainHours: 1,
    FridayTrainHours: 1,
  });

  let location = useLocation();
  console.log("location: ", location);

  if (location.state == null) {
    // Location state data NOT sent through ..... therefore use PROP info sent through ...
    console.log("location.state is NULL");
    console.log("props.customerEntity on Profile Page: ", props.customerEntity);

    setCustomer({ ...customer,
        id: props.customerEntity.id,
        EmailAddress: props.customerEntity.EmailAddress,
        MobileNumber: props.customerEntity.MobileNumber,
        gender: props.customerEntity.Male ? "Male" : "Female",
        FirstName: props.customerEntity.FirstName,
        LastName: props.customerEntity.LastName,
        Country: props.customerEntity.Country,
        DateOfBirth: props.customerEntity.DateOfBirth,
        SaturdayTrain: props.customerEntity.SaturdayTrain,
        SaturdayTrainHours: Number(props.customerEntity.SundayTrainHours),
        SundayTrain: props.customerEntity.SundayTrain || true,
        SundayTrainHours: Number(props.customerEntity.SundayTrainHours),
        MondayTrain: props.customerEntity.MondayTrain,
        MondayTrainHours: Number(props.customerEntity.MondayTrainHours),
        TuesdayTrain: props.customerEntity.TuesdayTrain,
        TuesdayTrainHours: Number(props.customerEntity.TuesdayTrainHours),
        WednesdayTrain: props.customerEntity.WednesdayTrain,
        WednesdayTrainHours: Number(props.customerEntity.WednesdayTrainHours),
        ThursdayTrain: props.customerEntity.ThursdayTrain,
        ThursdayTrainHours: Number(props.customerEntity.ThursdayTrainHours),
        FridayTrain: props.customerEntity.FridayTrain,
        FridayTrainHours: Number(props.customerEntity.FridayTrainHours),
        _version: props.customerEntity._version,
      });



  } else {
    // PROP data sent through is NULL ..... use Location STATE data ....
    console.log(
      "location.state.customerEntity: ",
      location.state.customerEntity
    );
    let locationStateCustomerEntity = location.state.customerEntity;

    setCustomer({ ...customer,
        id: locationStateCustomerEntity.id,
        EmailAddress: locationStateCustomerEntity.EmailAddress,
        MobileNumber: locationStateCustomerEntity.MobileNumber,
        gender: locationStateCustomerEntity.Male ? "Male" : "Female",
        FirstName: locationStateCustomerEntity.FirstName,
        LastName: locationStateCustomerEntity.LastName,
        Country: locationStateCustomerEntity.Country,
        DateOfBirth: locationStateCustomerEntity.DateOfBirth,
        SaturdayTrain: locationStateCustomerEntity.SaturdayTrain,
        SaturdayTrainHours: Number(locationStateCustomerEntity.SundayTrainHours),
        SundayTrain: locationStateCustomerEntity.SundayTrain || true,
        SundayTrainHours: Number(locationStateCustomerEntity.SundayTrainHours),
        MondayTrain: locationStateCustomerEntity.MondayTrain,
        MondayTrainHours: Number(locationStateCustomerEntity.MondayTrainHours),
        TuesdayTrain: locationStateCustomerEntity.TuesdayTrain,
        TuesdayTrainHours: Number(locationStateCustomerEntity.TuesdayTrainHours),
        WednesdayTrain: locationStateCustomerEntity.WednesdayTrain,
        WednesdayTrainHours: Number(locationStateCustomerEntity.WednesdayTrainHours),
        ThursdayTrain: locationStateCustomerEntity.ThursdayTrain,
        ThursdayTrainHours: Number(locationStateCustomerEntity.ThursdayTrainHours),
        FridayTrain: locationStateCustomerEntity.FridayTrain,
        FridayTrainHours: Number(locationStateCustomerEntity.FridayTrainHours),
        _version: locationStateCustomerEntity._version,
      });
  }

  


  // const [user, setUser] = useState("");
  /*
    const [customer, setCustomer] = useState({
        id: "",
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        gender: "",
        MobileNumber: "",
        Country: "",
        DateOfBirth: "",
        SaturdayTrain: true,
        SundayTrain: true,
        MondayTrain: true,
        TuesdayTrain: true,
        WednesdayTrain: true,
        ThursdayTrain: true,
        FridayTrain: true,
        SaturdayTrainHours: 1,
        SundayTrainHours: 1,
        MondayTrainHours: 1,
        TuesdayTrainHours: 1,
        WednesdayTrainHours: 1,
        ThursdayTrainHours: 1,
        FridayTrainHours: 1
    });

*/

  /*

    const getCustomer = async (id) => {
        const customerData = await API.graphql(graphqlOperation(getCustomerByID , {id: id}));
        console.log("customerData : ", customerData.data.getCUSTOMER360DSL);
        const userData = customerData.data.getCUSTOMER360DSL;
        if(customerData.data.getCUSTOMER360DSL){
            setCustomer(customerData);
            setUser({
                ...user,
                id: userData.id,
                EmailAddress: userData.EmailAddress,
                MobileNumber: userData.MobileNumber,
                gender: userData.Male  ? "Male": "Female",
                FirstName: userData.FirstName,
                LastName: userData.LastName,
                Country: userData.Country,
                DateOfBirth: userData.DateOfBirth,
                SaturdayTrain :userData.TrainingDays.SaturdayTrain,
                SaturdayTrainHours :Number(userData.TrainingDays.SundayTrainHours),
                SundayTrain :userData.TrainingDays.SundayTrain || true,
                SundayTrainHours :Number(userData.TrainingDays.SundayTrainHours),
                MondayTrain :userData.TrainingDays.MondayTrain,
                MondayTrainHours :Number(userData.TrainingDays.MondayTrainHours),
                TuesdayTrain :userData.TrainingDays.TuesdayTrain,
                TuesdayTrainHours :Number(userData.TrainingDays.TuesdayTrainHours),
                WednesdayTrain :userData.TrainingDays.WednesdayTrain,
                WednesdayTrainHours :Number(userData.TrainingDays.WednesdayTrainHours),
                ThursdayTrain :userData.TrainingDays.ThursdayTrain,
                ThursdayTrainHours :Number(userData.TrainingDays.ThursdayTrainHours),
                FridayTrain :userData.TrainingDays.FridayTrain,
                FridayTrainHours :Number(userData.TrainingDays.FridayTrainHours),
            })
        }
  
    }


  useEffect(() => {
    //console.log("Incoming 360dsl customer entity: ", customerEntity);
    //console.log("Incoming 360dsl customer Id: ", customerId);
    //setCustomer(customerEntity);
    //console.log("customer set to: ", customer);
    //console.log("customer EmailAddress set to: ", customer.EmailAddress);
    /*
        Auth.currentAuthenticatedUser({
            bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
          })
            .then((userData) => {
              setUser({...user, id: userData.username});
              getCustomer(userData.username);
              console.log("Current userId: ", userData.username);
            })
            .catch((err) => console.log(err));

  }, []);
  */
  const handleChange = (e) => {
    console.log(e);
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleCheckBox = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.checked });
  };
  const saveCustomer = async () => {
    if (Object.keys(customer).every((key) => customer[key] !== "")) {
      const updateCustomer = await API.graphql(
        graphqlOperation(updateCustomer360DSL, {
          id: customer.id,
          EmailAddress: customer.EmailAddress,
          MobileNumber: customer.MobileNumber,
          Male: customer.gender === "Male" ? true : false,
          FirstName: customer.FirstName,
          LastName: customer.LastName,
          Country: customer.Country,
          DateOfBirth: new Date(customer.DateOfBirth)
            .toISOString()
            .substring(0, 10),
          SaturdayTrain: customer.SaturdayTrain,
          SaturdayTrainHours: Number(customer.SundayTrainHours),
          SundayTrain: customer.SundayTrain,
          SundayTrainHours: Number(customer.SundayTrainHours),
          MondayTrain: customer.MondayTrain,
          MondayTrainHours: Number(customer.MondayTrainHours),
          TuesdayTrain: customer.TuesdayTrain,
          TuesdayTrainHours: Number(customer.TuesdayTrainHours),
          WednesdayTrain: customer.WednesdayTrain,
          WednesdayTrainHours: Number(customer.WednesdayTrainHours),
          ThursdayTrain: customer.ThursdayTrain,
          ThursdayTrainHours: Number(customer.ThursdayTrainHours),
          FridayTrain: customer.FridayTrain,
          FridayTrainHours: Number(customer.FridayTrainHours),
          _version: customer._version,
        })
      );
      // Ensure latest version of DB entity is known in case we update again ....
      setCustomer({ ...customer, _version: customer._version + 1 });

      if (customer.FirstName === "-" || customer.LastName === "-") {
        alert(`Please fill all the fields`);
      } else {
        props.setRedirect(false);
        window.location.reload();
      }
    } else {
      alert(`Please fill all the fields`);
    }
  };

  return (
    <div className="ProfileMainDiv">
      {/* <Paper> */}
      <Card sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Box textAlign="center">
              <h1>Personal Details</h1>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="FirstName"
              value={customer.FirstName}
              label="First Name"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="LastName"
              value={customer.LastName}
              label="Last Name"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="EmailAddress"
              value={customer.EmailAddress}
              label="Email Address"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="genderLabel">Select Gender</InputLabel>
              <Select
                labelId="genderLabel"
                id="gender"
                name="gender"
                value={customer.gender}
                label="Gender"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              type="text"
              value={customer.MobileNumber}
              name="MobileNumber"
              label="Mobile Number"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="DateOfBirth"
              InputLabelProps={{ shrink: true }}
              value={customer.DateOfBirth}
              type="date"
              label="Date Of Birth"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <Autocomplete
              id="country"
              name="Country"
              value={customer.Country}
              inputValue={customer.Country}
              options={CountryList?.map((option) => option.name)}
              fullWidth
              onInputChange={(a, b) => setCustomer({ ...customer, Country: b })}
              renderInput={(params) => (
                <TextField {...params} label="Select Country" />
              )}
            />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ padding: "20px", marginTop: "10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3} md={3} sm={6} />
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Box textAlign="center" my={2}>
              <h1>TrainingDays</h1>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="FridayTrain"
                  checked={customer.FridayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="FridayTrain"
            />
            <br />
            <TextField
              type="number"
              defaultValue={customer.FridayTrainHours}
              name="FridayTrainHours"
              label="Friday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="SaturdayTrain"
                  checked={customer.SaturdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="SaturdayTrain"
            />
            <br />
            <TextField
              type="number"
              defaultValue={customer.SaturdayTrainHours}
              name="SaturdayTrainHours"
              label="Saturday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="SundayTrain"
                  checked={customer.SundayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="SundayTrain"
            />
            <br />
            <TextField
              type="number"
              defaultValue={customer.SundayTrainHours}
              name="SundayTrainHours"
              label="Sunday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="MondayTrain"
                  checked={customer.MondayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="MondayTrain"
            />
            <br />
            <TextField
              type="number"
              defaultValue={customer.MondayTrainHours}
              name="MondayTrainHours"
              label="Monday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckBox}
                  checked={customer.TuesdayTrain}
                  name="TuesdayTrain"
                />
              }
              label="TuesdayTrain"
            />
            <br />
            <TextField
              type="number"
              defaultValue={customer.TuesdayTrainHours}
              name="TuesdayTrainHours"
              label="Tuesday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="WednesdayTrain"
                  checked={customer.WednesdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="WednesdayTrain"
            />
            <br />
            <TextField
              type="number"
              defaultValue={customer.WednesdayTrainHours}
              name="WednesdayTrainHours"
              label="Wednesday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="ThursdayTrain"
                  checked={customer.ThursdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="ThursdayTrain"
            />
            <br />
            <TextField
              type="number"
              defaultValue={customer.ThursdayTrainHours}
              name="ThursdayTrainHours"
              label="Thursday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Box textAlign="center">
              <Button variant="outlined" onClick={saveCustomer} color="primary">
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
      {/* </Paper> */}
    </div>
  );
}

//export default Profile;
