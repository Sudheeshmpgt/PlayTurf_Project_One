const cloudinary = require('cloudinary').v2

const cloudConfig = cloudinary.config({ 
    cloud_name: 'dubmms1ur', 
    api_key: '836684132162993', 
    api_secret: 'U3_4xmtBm9pw88heylhiGP5LNqE',
    secure: true
  });

const config={
    MONGO_URL:"mongodb://localhost:27017/playturf",
    SECRET_KEY:"THISISMYNEWSECRETKEYFROMTHESERVER" 
}


module.exports=cloudConfig;
module.exports=config;