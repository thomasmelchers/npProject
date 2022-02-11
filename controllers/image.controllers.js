const UserModel = require("../models/user.model");
/* const { uploadErrors } = require("../utils/errors.utils"); */
const multer = require('multer')
let uploaded = false

module.exports.imageProfil = async (req, res) => {
/* console.log(req.file) */
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
    
    uploaded = true ;

    if (uploaded === true){
        await UserModel.findByIdAndUpdate(
          req.body.userId,
          {
            $set : {picture: req.file.originalname },
            
          },
          { new: true, upsert: true, setDefaultsOnInsert: true},
          (err, docs) => {
            if (!err) 
            return res.send(docs);
            else return res.status(500).send('The image has not been added to the database');
          }
        )
      }
    /* return res.status(200).json("File uploaded successfully.")  */
    
  } catch (err) {
    console.log(err);
    /* return res.status(201).json({ errors }) */;
  }
}
