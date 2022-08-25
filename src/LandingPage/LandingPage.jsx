import React, {useEffect , useState} from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createCustomer360DSL, getCustomerByID } from "../Apollo/queries";
import {Navigate } from "react-router-dom"

import Header from "../Components/Header"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";
import ThreeSixtyDSL from "../ThreeSixtyDSL/ThreeSixtyDSL";
import ThirdParty from "../ThreeSixtyDSL/ThirdParty";
import Profile from "../ProfilePage/Profile";


const LandingPage = () => {
    const [userId, setUserId] = useState("");
    const [customer, setCustomer] = useState("");
    const [redirect, setRedirect] = useState(false);
    let customerDataVersion = 0;


    const getCustomer = async (id) => {
      try {
        const customerData = await API.graphql(graphqlOperation(getCustomerByID , {id: id}));
      console.log("customerData : ", customerData.data.getCUSTOMER360DSL);
      if(!customerData.data.getCUSTOMER360DSL){
        console.log("Customer does not exist ....")
        setRedirect(true);
        // const createCustomer = await API.graphql(graphqlOperation(createCustomer360DSL , {id, EmailAddress}));
        // console.log("createCustomer : ", createCustomer);

      }
      console.log("Customer exsists ....");
      setCustomer(customerData.data.getCUSTOMER360DSL);
      customerDataVersion = customerData.data.getCUSTOMER360DSL?._version;
      console.log("Customer Data returned: " + JSON.stringify(customer));
      console.log("Customer version (Landing Page): " , customerDataVersion);
      } catch (error) {
        console.log("Customer does not exist ....", error)
        setRedirect(true);
      }

    }
    useEffect(() => {
      Auth.currentAuthenticatedUser({
        bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
        .then((user) => {
          setUserId(user.username);
          console.log("Current userId: ", user.username);
          //console.log("Current Email address: ", user.attributes.email);
          getCustomer(user.username);
          
        })
        .catch((err) => console.log(err));
    }, []);
    return (
        <BrowserRouter>
        <Header user={userId}></Header>
            {redirect ? <Profile /> :
            <Routes>
                <Route path="/Profile" element={<Profile />} />
                <Route path="/ThirdParty" element={<ThirdParty />} />
                <Route exact path="/" element={<ThreeSixtyDSL customerData={customer}/>} />
            </Routes>
            }
        </BrowserRouter>
    )
}

export default LandingPage