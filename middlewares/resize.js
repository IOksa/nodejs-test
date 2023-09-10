const jimp = require("jimp");
const path = require('path');

const resize = (req)=>{
   
    const {originalname} = req.file;
    const pathName = path.join(__dirname, "../", "tmp", originalname);
    
    jimp.read(pathName)
    .then((img) => img.resize(250, 250).write(pathName))
    .catch((err) => {
        console.log(err);
      });
 
      console.log("resize");
};

module.exports = resize;