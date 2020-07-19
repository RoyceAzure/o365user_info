import {CosmosClientFactory}  from "./models/cosmosClient";
var mongoClient = require("mongodb").MongoClient;
/**
 * use CosmosClientFactory to create client to connect 特定 cosmos account
 * 並且定義操控該account 下面的 db, container 方法
 */
export class Cosmos_service{
    client : typeof mongoClient;
    database : typeof mongoClient.database;
    container : typeof mongoClient.database.collection;
    constructor(connect_string : string)
    {
        // this.client = CosmosClientFactory.init(connect_string);
        this.client = CosmosClientFactory.init();
    }
    async createDatabase(id : string)
    {
        const DBres = await this.client.databases.createIfNotExists({id : "testCreateDB"});
        this.database = DBres.database;
    }
    async createCollection(id :string)
    {
        this.container = await this.database.containers(id);
    }
    async createItem(create_id:string, create_content : any)
    {
        const itemRes = await this.container.items.create({id : create_id, content : create_content});
        console.log(`itemRes :${itemRes}`);
    }
}


