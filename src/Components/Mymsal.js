import React from 'react';
import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";
import { render } from 'react-dom';
// import * as msal from "msal";
import { UserAgentApplication, InteractionRequiredAuthError } from "msal";
import { ImplicitMSALAuthenticationProvider } from "@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';
import config from '../config';

class MyMsal extends React.Component {
    //your codding
    accessToken;
    constructor(props) {
        super(props);
        // console.log(Client);
        this.loginPopup = this.loginPopup.bind(this);
        this.loginRedirect = this.loginRedirect.bind(this);
        this.loginssoSilent = this.loginssoSilent.bind(this);
        this.MyaquireTokenSilence = this.MyaquireTokenSilence.bind(this);
        this.MyaquireTokenSilence2 = this.MyaquireTokenSilence2.bind(this);
        this.sendGraphApi = this.sendGraphApi.bind(this);
        this.myLoginout = this.myLoginout.bind(this);
        this.msalConfig =
        {
            auth: {
                clientId: config["client_ID"],
                // redirectUrl : config["redirectUrl"],
                authority: config["authority"],
                // postLogoutRedirectUri: "https://127.0.0.1:3000",
            },
            catch: {
                catcheLocation: "sessionStorage",
                storeAuthStateInCookie: false
            }
        }


        this.loginRequest =
        {
            scopes: ["openid", "profile", "User.Read"]
        }
        this.tokenRequest =
        {
            scopes: ["Mail.Read"]
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
            }).catch(err => {
                console.log(`err : ${err}`);
            });
        if (this.msalApplication.getAccount()) {
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
    async loginRedirect() {

        try {
            const loginResponse = await this.msalApplication.loginRedirect(this.loginRequest);
            console.log(`loginResponse :${loginResponse}`);
            if (this.msalApplication.getAccount())
                Object.keys(loginResponse).forEach((item, index, array) => {
                    console.log(`item : ${item}, value: ${loginResponse[item]}`);
                });
            console.log(Object.keys(loginResponse["idToken"]));
            console.log(loginResponse["idToken"].toString());
        } catch (err) {
            console.log(err);
        }
    }
    async loginssoSilent() {
        const silentrequest = {
            scope: ["User.Read", "Mail.Read"],
            loginHint: "Royce.Wang@wiadvance.com"
        };
        try {
            const loginesponse = await this.msalApplication.ssoSilent(silentrequest);
            if (loginesponse) {
                console.log(`loginResponse :${loginesponse}`);
                const myAccounts = this.msalApplication.getAccount();
                console.log(myAccounts)
            }
        } catch (err) {
            if (err instanceof InteractionRequiredAuthError) {
                this.msalApplication.loginPopup(silentrequest)
                .catch(err=>{
                    console.log(`err : ${err}`);
                })
 
            }
            else {
                console.log("err happend ,but not InteractionRequiredAuthError");
            }
        }
    }
    MyaquireTokenSilence() {
        var request = {
            scopes: ["Mail.Read"]
        };
        this.msalApplication.acquireTokenSilent(request).then(
            tokenResponse => {
                console.log(`acquireTokenSilent tokenResponse ${tokenResponse}`);
                console.log(` access token ${tokenResponse.accessToken}`);
                this.accessToken = tokenResponse.accessToken;
            }
        )
            .catch((err) => {
                if (err instanceof InteractionRequiredAuthError) {
                    return this.msalApplication.acquireTokenPopup(request);
                }
            }).catch(err => {
                console.log(err);
            })
    }
    async MyaquireTokenSilence2() {
        const request = {
            scopes: ["Mail.Read"]
        }
       this.msalApplication.acquireTokenSilent(request)
       .then(responsee=>{
            console.log(responsee)
            this.accessToken = responsee.accessToken;
       })
       .catch(async (err)=>{
           if(err instanceof InteractionRequiredAuthError)
           {
               return await this.msalApplication.acquireTokenPopup(request);   //是要return 
           }
       }).catch(err=>{
           console.log(`err ${err}`);
       })

    }

    sendGraphApi()
    {
        var headers = new Headers();
        var bearer = "Bearer " + this.accessToken;
        console.log(bearer);
        headers.append("Authorization", bearer);
        var options = {
            method : "GET",
            headers : headers
        }
        var graphEndpoint = "https://graph.microsoft.com/v1.0/me";
        fetch(graphEndpoint, options)
        .then(res=>{
            console.log(res.body);
        });
    }
    myLoginout()
    {
        // const currentaccount = this.msalApplication.getAccountByUsername("Royce.Wang@wiadvance.com");
        this.msalApplication.logout({
            // account : currentaccount
        })
    }

render(){
    // this.TestMsGraph(config);
    return (
        <div>
            <button onClick={this.loginPopup}>
                loginPopup
            </button>
            <button onClick={this.loginRedirect}>
                loginRedirect
            </button>
            <button onClick={this.loginssoSilent}>
                loginssoSilent
            </button>
            <button onClick={this.MyaquireTokenSilence}>
                MyaquireTokenSilence
            </button>
            <button onClick={this.MyaquireTokenSilence2}>
            MyaquireTokenSilence2
            </button>
            <button onClick={this.sendGraphApi}>
            sendGraphApi
            </button>
            <button onClick={this.myLoginout}>
            myLoginout
            </button>
        </div>
    )
} 
   }
export default MyMsal;