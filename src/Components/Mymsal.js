import React from 'react';
import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";
import { render } from 'react-dom';
import { UserAgentApplication } from "msal";
import { ImplicitMSALAuthenticationProvider } from "@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';
import config from '../config';

class MyMsal extends React.Component {
    //your codding

    constructor()
    {
        super();
        console.log(Client);
    }
   
    async TestMsGraph(config) {   //d使用 public app ??  
        console.log("call TestMsGraph");      
        const msalConfig = 
        {
            auth : {
                clientId : config["client_ID"],
                redirectUrl : config["redirectUrl"],
                authority : config["authority"]                
            },
            catch :{
                catcheLocation: "sessionStorage",
                storeAuthStateInCookie : false
            }
        }
        const loginRequest = {
        scopes: ["openid", "profile", "User.Read"]
          };
        const tokenRequest = {
            scopes: ["Mail.Read"]
          };
        console.log(`redirecturl : ${ config["redirectUrl"]}`);
        const graphScopes = config["graphScopes"];
        const msalApplication = new UserAgentApplication(msalConfig);


        // msalApplication.loginPopup(loginRequest)
        //   .then(loginRespopnse => {
        //       console.log(`loginResponse :${loginRespopnse}`);
        //       if(msalApplication.getAccount())
        //         Object.keys(loginRespopnse).forEach((item, index, array) =>
        //         {
        //             console.log(`item : ${item}, value: ${loginRespopnse[item]}`);
        //         });
        //         console.log(Object.keys(loginRespopnse["idToken"]));
        //         console.log(loginRespopnse["idToken"].toString());
        //   }).catch( err => {
        //         console.log(`err : ${err}`);
        //   });
        try{
            const loginResponser = msalApplication.loginPopup(loginRequest);
            if(loginResponser)
                Object.keys(loginResponser).forEach(item => {
                    console.log(`keys : ${item}, value : ${loginResponser[item]}`)
                })
        }catch(err)
        {
            console.log(err);
        }


        // const provideroptions = new MSALAuthenticationProviderOptions(graphScopes);
        // const authProvider = new ImplicitMSALAuthenticationProvider(msalApplication, provideroptions);
        // const options = {
        //     authProvider,
        // }
        // console.log("about to call Client.initWithMiddleware(options);");
        // const client = Client.initWithMiddleware(options);
        // console.log("after  call Client.initWithMiddleware(options);");

        // try{
        //     console.log("about to call await client.api(/me).get();");
        //     let userDetails = await client.api("/me").get();
        //     console.log(userDetails);
        //     console.log("after  call await client.api(/me).get();");
        // }
        // catch(err){
        //     console.log("in error");
        //     throw(err);
        // }
        // console.log("end call TestMsGraph");    
    }
    // getTokenPopup(request)
    // {

    // }

    render(){
        // this.TestMsGraph(config);
        return React.createElement('ul', null, 'Hello List');
      } 
   }
export default MyMsal;