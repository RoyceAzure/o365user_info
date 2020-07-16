import {mongoose} from "mongoose";
import {env} from "./enviroment/mongoenv";

mongoose.Promise = global.Promise;



const connection_string = `mongodb://${env.host}:${env.key}@${env.host}.documents.azure.com:${env.port}/?ssl=true&replicaSet=globaldb`;

function connect()
{
    return mongoose.connect(connection_string, {useMongoClient : true});
}

module.exports = {
    connect,
    mongoose
};