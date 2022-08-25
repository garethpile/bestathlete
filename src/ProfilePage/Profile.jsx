import React, { useEffect, useState } from "react";
import { TextField, Select, Card, MenuItem, Button, Grid, FormControlLabel, InputLabel, FormControl, Autocomplete, Checkbox } from "@mui/material";
import CountryList from "./ContryList"
import "./Profile.css";
import { Box } from "@mui/system";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createCustomer360DSL, getCustomerByID } from "../Apollo/queries";



const Profile = () => {
    const [customer, setCustomer] = useState("");
    const [user, setUser] = useState({
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
    const handleChange = (e) => {
        console.log(e)
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleCheckBox = (e) => {
        setUser({ ...user, [e.target.name]: e.target.checked });
    }
    const saveUser = async () => {
        // const {} = user;
        if (Object.keys(user).every(key => user[key] !== "")) {
            const createCustomer = await API.graphql(graphqlOperation(createCustomer360DSL , {
                id: user.id,
                EmailAddress: user.EmailAddress,
                MobileNumber: user.MobileNumber,
                Male: user.gender == "Male" ? true: false,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Country: user.Country,
                DateOfBirth: new Date(user.DateOfBirth).toISOString().substring(0, 10),
                SaturdayTrain :user.SaturdayTrain,
                SaturdayTrainHours :Number(user.SundayTrainHours),
                SundayTrain :user.SundayTrain,
                SundayTrainHours :Number(user.SundayTrainHours),
                MondayTrain :user.MondayTrain,
                MondayTrainHours :Number(user.MondayTrainHours),
                TuesdayTrain :user.TuesdayTrain,
                TuesdayTrainHours :Number(user.TuesdayTrainHours),
                WednesdayTrain :user.WednesdayTrain,
                WednesdayTrainHours :Number(user.WednesdayTrainHours),
                ThursdayTrain :user.ThursdayTrain,
                ThursdayTrainHours :Number(user.ThursdayTrainHours),
                FridayTrain :user.FridayTrain,
                FridayTrainHours :Number(user.FridayTrainHours),


            }));
        console.log("createCustomer : ", createCustomer);
        }
        else {
            alert(`Please fill all the fields`)
        }
    }
    return (
        <div className="ProfileMainDiv">
            {/* <Paper> */}
            <Card sx={{padding : "20px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12} md={12} sm={12}>
                        <Box textAlign="center">
                            <h1>Personal Details</h1>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <TextField name="FirstName" value={user.FirstName} label="First Name" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <TextField name="LastName" value={user.LastName} label="Last Name" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <TextField name="EmailAddress" value={user.EmailAddress} label="Email Address" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="genderLabel">Select Gender</InputLabel>
                            <Select
                                labelId="genderLabel"
                                id="gender"
                                name="gender"
                                value={user.gender}
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
                        <TextField type="text" value={user.MobileNumber} name="MobileNumber" label="Mobile Number" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <TextField name="DateOfBirth" InputLabelProps={{ shrink: true }} value={user.DateOfBirth} type="date" label="Date Of Birth" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <Autocomplete
                            id="country"
                            name="Country"
                            value={user.Country}
                            inputValue={user.Country}
                            options={CountryList?.map((option) => option.name)}
                            fullWidth
                            onInputChange={(a, b) => setUser({ ...user, "Country": b })}
                            renderInput={(params) => <TextField {...params} label="Select Country" />}
                        />
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{padding : "20px" , marginTop : "10px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3} md={3} sm={6} />
                <Grid item xs={12} lg={12} md={12} sm={12}>
                    <Box textAlign="center" my={2}>
                        <h1>TrainingDays</h1>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="FridayTrain"  checked={user.FridayTrain} onChange={handleCheckBox} />} label="FridayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="FridayTrainHours" label="Friday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="SaturdayTrain"  checked={user.SaturdayTrain} onChange={handleCheckBox} />} label="SaturdayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="SaturdayTrainHours" label="Saturday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="SundayTrain"  checked={user.SundayTrain} onChange={handleCheckBox} />} label="SundayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="SundayTrainHours" label="Sunday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="MondayTrain"  checked={user.MondayTrain} onChange={handleCheckBox} />} label="MondayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="MondayTrainHours" label="Monday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox onChange={handleCheckBox}  checked={user.TuesdayTrain} name="TuesdayTrain" />} label="TuesdayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="TuesdayTrainHours" label="Tuesday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="WednesdayTrain"  checked={user.WednesdayTrain} onChange={handleCheckBox} />} label="WednesdayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="WednesdayTrainHours" label="Wednesday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="ThursdayTrain"  checked={user.ThursdayTrain} onChange={handleCheckBox} />} label="ThursdayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="ThursdayTrainHours" label="Thursday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                    <Box textAlign="center">
                        <Button variant="outlined" onClick={saveUser} color="primary">Save</Button>
                    </Box>
                </Grid>
            </Grid>
            </Card>
            {/* </Paper> */}
        </div>)
}


export default Profile;