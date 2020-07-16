import {monogoose, mongo} from "mongoose";

const Schema = monogoose.Schema;
const emailSchema = new Schema({
    userId : {
        type: Number , 
        required : true,
        unique : true
     },
    startDate : Date,
    endDate : Date,
    afterHours : Number,
    readEmail : Number
});

const Email = monogoose.model("Email", emailSchema);
module.exports = Email;
