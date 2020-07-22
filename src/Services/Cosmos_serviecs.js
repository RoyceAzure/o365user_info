import React from "react";
import { CosmosClient } from "@azure/cosmos";

const CosmosClient = require("@azure/cosmos").CosmosClient;
const env = require("./enviroment/mongoenv").env;

export class CosmosService extends React.PureComponent
{
    database;
    
    constructor(props)
    {
        super(props);
        this.client = new CosmosClient({
            endpoint: `https://${env.HOST}`,
            key: env.PASSWORD
        });
    }
    static CosmosFactory = ()=>CosmosService();
    DBCreateifNotExists = (id)=>
    {
        this.database = this.client.databases.createIfNotExists({id : id})
        .then(db=>db)
        .catch(err=>console.log(err))
    }
    containerCreateifNotExists = (id)=>
    {
        this.database = this.client.databases.createIfNotExists({id : id})
        .then(db=>db)
        .catch(err=>console.log(err))
    }
}

const { database }  = client.databases.create({ id: 'my-database3', throughput: 10000 })
    .then(db=>{
        db.database.containers.create({ id: 'my-container', throughput: 10000 })
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })