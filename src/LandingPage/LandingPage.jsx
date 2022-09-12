import React, { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getCustomerByID  } from "../Apollo/queries";
import axios from "axios";

import Header from "../Components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate
} from "react-router-dom";
import ThreeSixtyDSL from "../ThreeSixtyDSL/ThreeSixtyDSL";
import ThirdParty from "../ThreeSixtyDSL/ThirdParty";
import Profile from "../ProfilePage/Profile";

const LandingPage = () => {
  const [userId, setUserId] = useState("");
  const [customer, setCustomer] = useState("");
  const [redirect, setRedirect] = useState(false);
  let customerDataVersion = 0;

  const stravaPartyId='';

  const getCustomer = async (id) => {
    try {
      const customerData = await API.graphql(
        graphqlOperation(getCustomerByID, { id: id })
      );
      console.log("customerData : ", customerData.data.getCUSTOMER360DSL);
      if (!customerData.data.getCUSTOMER360DSL) {
        console.log("Customer does not exist ....");
        setRedirect(true);
      }
      console.log("Customer exsists ....");
      setCustomer(customerData.data.getCUSTOMER360DSL);
      customerDataVersion = customerData.data.getCUSTOMER360DSL?._version;
      console.log("Customer Data returned: " + JSON.stringify(customer));
      console.log("Customer version (Landing Page): ", customerDataVersion);
    } catch (error) {
      console.log("Customer does not exist ....", error);
      setRedirect(true);
    }
  };


  const getStravaPartyId = async (customer360dslId) => {
    try {
        let stravaInformation = await axios.get(`https://p7v775qaqh.execute-api.eu-west-1.amazonaws.com/prod/strava?customer360dslId=${customer360dslId}`);
        console.log("Strava Party Information retrieved: ", stravaInformation);
        console.log("Strava Party Information body retrieved: ", stravaInformation.data.body);
        console.log("Strava Party Information Item[0] retrieved: ", stravaInformation.data.body.Items[0]);
        stravaPartyId = stravaInformation.data.body.Items[0].PartyId;
        console.log("Strava Party Id retrieved: ", stravaInformation.data.body.Items[0].PartyId);
      }
    catch (error) {
      console.log("Error retrieving Strava Party info ....", error);
    }
  };


  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        setUserId(user.username);
        console.log("Current userId: ", user.username);
        console.log("Get customer data of current logged in user .....");
        getCustomer(user.username);

        console.log("Retrieving Strava Party Id ...");
       getStravaPartyId(user.username);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
      <Header user={userId}></Header>
      {redirect ? (
        <Profile setRedirect={setRedirect} />
      ) : (
        <Routes>
          <Route path="/Profile" element={<Profile />} />
          <Route
            path="/ThirdParty"
            element={<ThirdParty customerData={customer} />}
          />
          <Route
            exact
            path="/"
            element={<ThreeSixtyDSL customerData={customer} />}
          />
          <Route
            exact
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default LandingPage;
