// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const GOOGLE_TOKENS = {
    GOOGLE_CLIENT_ID: "138518727357-knc1fld5mld5v5u4av4q6icg2a68gr2s.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "fpDuUGkxH-06jE-yzkp4B3D7",
  };
  
  const MONGODB = {
    MONGODB_URI: `mongodb+srv://user:pass@cluster0.ntqxk.mongodb.net/myFirstDatabase`
  };
  
  const SESSION = {
    COOKIE_KEY: "thisappisawesome"
  };
  
  const KEYS = {
    ...GOOGLE_TOKENS,
    ...MONGODB,
    ...SESSION
  };

  export default KEYS;