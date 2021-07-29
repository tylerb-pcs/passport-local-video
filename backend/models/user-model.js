import mongoose from "mongoose";
import findOrCreate from 'mongoose-findorcreate';

const user = new mongoose.Schema({
    id: String,
    name: String,
    password: String,
    picture: String,
    email: String,
});

user.plugin(findOrCreate); //no longer added by default https://www.npmjs.com/package/mongoose-findorcreate

export default mongoose.model('User', user);