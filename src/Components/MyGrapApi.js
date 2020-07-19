import React from "react";
import { Client } from "@microsoft/microsoft-graph-client";
import { ImplicitMSALAuthenticationProvider } from "@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';
import { UserAgentApplication } from "msal";
import {Cosmos_service} from "../services/Cosmos.service";
import style from "./MyGraphApi.module.scss";
import config from '../config';
export class MyGraphApi extends React.PureComponent {

    state = {
        url: "",
        graph_version : "beta",
        graph_permission : []
    }

    constructor() {
        super();
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
        this.handlePermissionChange = this.handlePermissionChange.bind(this);


    }

    printErr = (err)=>{
        Object.keys(err).forEach(key=>{
            console.log(`err key : ${key}, err value : ${err[key]}`);
        })
    }
    testGraphrequest = async (e, arg1) => {
        // console.log(this.client)
        const { url, graph_version } = this.state;
        console.log(`url : ${url}`);
        console.log(`url : ${graph_version}`);
        this.msalApplication = new UserAgentApplication(this.msalconfig);
        this.option = new MSALAuthenticationProviderOptions(this.state.graph_permission);
        this.authProvider = new ImplicitMSALAuthenticationProvider(this.msalApplication, this.option);
        this.graphClientOptions = {
            authProvider: this.authProvider
        }
        this.client = Client.initWithMiddleware(this.graphClientOptions);
        try {
            let userDetails = await this.client.api(url)
                .version(graph_version)
                .get();
            console.log(userDetails);
        }
        catch (err) {
            console.log(`err : ${err}`);
            this.printErr(err);
        }
    }
    handlePermissionChange= (e)=>{
        e.preventDefault();
        const permission = [];
        let str = e.target.value.split(",");
        Object.values(str).forEach((item,index)=>{
            permission.push(item.trim());
        })
        this.setState({graph_permission : permission});
        console.log(this.state.graph_permission);
    }
     testCosmos = async e=>{
        const client = new Cosmos_service(process.env.cosmos_connect_string);
        await client.createDatabase("testDatabase");
        await client.createCollection("testCollection");
        await client.createItem("testCreateItem", "itemValue");
    }
    render() {
        const { url, graph_permission } = this.state;
        return (
            <div className={style.wrap}>
                <h2 className={style.title}>MyGraphApi</h2>
                <div>
                    <form className={style.form}>
                        <ul>
                            <li>
                                <label><p>input graph api url </p></label>
                                <input value={url} type="text" onChange={e => this.setState({ url: e.target.value })} />
                            </li>
                            <li>
                                <label><p>version:</p></label>
                                <select value = {this.state.graph_version} onChange = {e=>{this.setState({graph_version : e.target.value})}}>
                                    <option value="beta">beta</option>
                                    <option value="v1.0">v1.0</option>
                                </select>
                            </li>
                            <li>
                                <label><p>Permission:</p></label>
                                <input value = {graph_permission} type="text" onChange = {e=>{this.handlePermissionChange(e)}}/>
                            </li>
                        </ul>
                    </form>
                    <ul>
                        <li>
                            <button onClick={e => this.testGraphrequest(e, 1)}>testGraphrequest</button>
                            <button onClick={e => this.testCosmos(e)}>testCosmos</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}