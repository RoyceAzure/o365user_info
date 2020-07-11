import React from 'react';
import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";
import { render } from 'react-dom';
import { UserAgentApplication, InteractionRequiredAuthError } from "msal";
import { ImplicitMSALAuthenticationProvider } from "@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';
import config from '../config';

class MyMsal extends React.Component {
    //your codding
    
    constructor(props)
    {
        super(props);
        console.log(Client);
        this.loginPopup = this.loginPopup.bind(this);
        this.loginRedirect = this.loginRedirect.bind(this);
        this.loginssoSilent = this.loginssoSilent.bind(this);
        this.MyaquireTokenSilence = this.MyaquireTokenSilence.bind(this);
        this.msalConfig = 
        {
            auth : {
                clientId : config["client_ID"],
                // redirectUrl : config["redirectUrl"],
                authority : config["authority"]                
            },
            catch :{
                catcheLocation: "sessionStorage",
                storeAuthStateInCookie : false
            }
        }
        this.loginRequest = 
        {
            scopes: ["openid", "profile", "User.Read"]
        }
        this.tokenRequest = 
        {
            scopes:["Mail.Read"]
        }
        this.msalApplication = new UserAgentApplication(this.msalConfig);
    }
   
    async loginPopup() {   //d使用 public app ??  
        // console.log("call TestMsGraph");      
        // console.log(`redirecturl : ${ config["redirectUrl"]}`);
        const graphScopes = config["graphScopes"];
        this.msalApplication.loginPopup(this.loginRequest)
          .then(loginRespopnse => {
              console.log(`loginResponse :${loginRespopnse}`);
              
                // Object.keys(loginRespopnse).forEach((item, index, array) =>
                // {
                //     console.log(`item : ${item}, value: ${loginRespopnse[item]}`);
                // });
                // console.log(Object.keys(loginRespopnse["idToken"]));
                // console.log(loginRespopnse["idToken"].toString());
          }).catch( err => {
                console.log(`err : ${err}`);
          });
          if(this.msalApplication.getAccount())
          {
              const myAccounts = this.msalApplication.getAccount();
              console.log(myAccounts)
          }
        // myAccounts.forEach(item =>{
        //     console.log(item);
        // })
        
    }
    // getTokenPopup(request)
    // {

    // }
    async loginRedirect()
    {
        
        try{
            const loginResponse = await this.msalApplication.loginRedirect(this.loginRequest);
            console.log(`loginResponse :${loginResponse}`);
            if(this.msalApplication.getAccount())
              Object.keys(loginResponse).forEach((item, index, array) =>
              {
                  console.log(`item : ${item}, value: ${loginResponse[item]}`);
              });
              console.log(Object.keys(loginResponse["idToken"]));
              console.log(loginResponse["idToken"].toString());
        }catch(err)
        {
            console.log(err);
        }
    }
    async loginssoSilent()
    {
        const silentrequest = {
            scope : ["User.Read", "Mail.Read"],
            loginHint :"Royce.Wang@wiadvance.com"
        };
        try{
            const loginesponse = await this.msalApplication.ssoSilent(silentrequest);
            if(loginesponse)
            {
                console.log(`loginResponse :${loginesponse}`);
                const myAccounts = this.msalApplication.getAccount();
                console.log(myAccounts)
            }
        }catch(err)
        {
            if(err instanceof InteractionRequiredAuthError)
            {
                const loginesponse = await this.msalApplication.loginPopup(silentrequest).catch(err)
                {
                    console.log(err);
                }
            }
            else{
                console.log("err happend ,but not InteractionRequiredAuthError");
            }
        }
    }
    MyaquireTokenSilence()
    {
        var request = {
            scopes : ["Mail.Read"]
        };
        this.msalApplication.acquireTokenSilent(request).then(
            tokenResponse=>{
                console.log(`acquireTokenSilent tokenResponse ${tokenResponse}`);
                console.log(` access token ${tokenResponse.accessToken}`);
            }
        )
    .catch((err)=>{
        if(err instanceof InteractionRequiredAuthError)
        {
            return this.msalApplication.acquireTokenPopup(request);
        }
    }).catch(err=>{
        console.log(err);
    })

    }
    render(){
        // this.TestMsGraph(config);
        return (
            <div>
            <button onClick = {this.loginPopup}>
                loginPopup
            </button>
            <button onClick = {this.loginRedirect}>
            loginRedirect
            </button>
            <button onClick = {this.loginssoSilent}>
            loginssoSilent
            </button>
            <button onClick = {this.MyaquireTokenSilence}>
            MyaquireTokenSilence
            </button>
            </div>
        )
      } 
   }
export default MyMsal;