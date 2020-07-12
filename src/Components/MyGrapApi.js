import React from "react";
import { Client } from "@microsoft/microsoft-graph-client";
import { ImplicitMSALAuthenticationProvider } from "@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';
import { UserAgentApplication } from "msal";
import style from "./MyGraphApi.module.scss";
import config from '../config';
export class MyGraphApi extends React.PureComponent {

    state = {
        url: ""
    }


    constructor(props) {
        super(props);
        this.msalconfig = {
            auth: {
                clientId: config["client_ID"],
                // redirectUrl : config["redirectUrl"],
                authority: config["authority"],
                postLogoutRedirectUri: "https:localhost:3000",
            },
            catch: {
                catcheLocation: "sessionStorage",
                storeAuthStateInCookie: false
            }
        }
        this.graphScopes = ["user.read", "mail.send"];
        this.msalApplication = new UserAgentApplication(this.msalconfig);
        this.option = new MSALAuthenticationProviderOptions(this.graphScopes);
        this.authProvider = new ImplicitMSALAuthenticationProvider(this.msalApplication, this.option);
        this.graphClientOptions = {
            authProvider : this.authProvider
        }
        this.client = Client.initWithMiddleware(this.graphClientOptions);
    }


    testGraphrequest = async (e,arg1) =>
    {
        // console.log(this.client)
        const {url} = this.state;
        console.log(`url : ${url}`);
        try{
            let userDetails = await this.client.api(url)
            .version("beta")
            .get();
            console.log(userDetails);
            console.log(this.client);
        }
        catch(err){
            console.log(`err : ${err}`);
        }
    }

    render() {
        const {url} = this.state;
        return (
            <div className={style.wrap}>
                <h2 className={style.title}>MyGraphApi</h2>
                <div>
                    <form className = {style.form}>
                        <label>input graph api url</label>
                        <input value = {url} type ="text" onChange = {e=>this.setState({url : e.target.value})}/>
                    </form>
                    <ul>
                        <li>
                            <button onClick = {e=>this.testGraphrequest(e,1)}>testGraphrequest</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}