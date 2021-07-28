import mongoose from "mongoose";
import findOrCreate from 'mongoose-findorcreate';

const user = new mongoose.Schema({
  displayName: String,
  photos: Object,
});

user.plugin(findOrCreate); //no longer added by default https://www.npmjs.com/package/mongoose-findorcreate

export default mongoose.model('User', user);