// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const TWITTER_TOKENS = {
    TWITTER_CONSUMER_KEY: "138518727357-knc1fld5mld5v5u4av4q6icg2a68gr2s.apps.googleusercontent.com",
    TWITTER_CONSUMER_SECRET: "SOME SECRET",
    TWITTER_ACCESS_TOKEN: "SOME ACCESS TOKEN",
    TWITTER_TOKEN_SECRET: "SOME TOKEN SECRET"
  };
  
  const MONGODB = {
    MONGODB_URI: `mongodb+srv://user:pass@cluster0.ntqxk.mongodb.net/myFirstDatabase`
  };
  
  const SESSION = {
    COOKIE_KEY: "thisappisawesome"
  };
  
  const KEYS = {
    ...TWITTER_TOKENS,
    ...MONGODB,
    ...SESSION
  };

  export default KEYS;
  // module.exports = KEYS;