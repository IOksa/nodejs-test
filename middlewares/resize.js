const jimp = require("jimp");
const path = require('path');

const resize = (req, res, next)=>{
   
    const {originalname} = req.file;
    const pathName = path.join(__dirname, "../", "tmp", originalname);
    
    jimp.read(pathName)
    .then((img) => img.resize(250, 250).write(pathName))
    .catch((err) => {
        console.log(err);
      });
      next();
};

module.exports = resize;