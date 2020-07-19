
import { env } from "../../enviormens/env_cosmos";
import * as mongoose from "mongoose";

/**
 * 用來創建CosmosClient
 * */

export class CosmosClientFactory {
    constructor() {
        // mongodb.Promise = global.Promise;
        console.log(env);
    //     return mongoose.connect("mongodb://" + env.COSMOSDB_HOST + ":" + env.COSMOSDB_PORT + "/" + env.COSMOSDB_DBNAME + "?ssl=true&replicaSet=globaldb",
    //         {
    //             auth: {
    //                 user: env.COSMODDB_USER,
    //                 password: env.COSMOSDB_PASSWORD
    //             }
    //         }
    //     ).then(()=>console.log("connect success"))
    //     .catch((err : any)=>console.log(`err :${err}`));
    // }
    
    mongoose.connect("mongodb://roycecosmos:WQ5jIAGesMrT8GxwilymuZYn3PVt5Kh3V3FkYJcV9KcwjxovdRguCDk6OAIK4MMqqjayqn4QGz0sL69krZKdOw==@roycecosmos.documents.azure.com:10255/?ssl=true&replicaSet=globaldb",{useNewUrlParser: true})
    .then(()=>mongoose.connection)
    .catch(err=>console.log(err));
    
    /**
     *  給定connect_string return CosmosClient instance
     */
    }
    static init() {
        return new CosmosClientFactory();
    }
}