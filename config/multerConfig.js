const multer = require("multer");
const path = require("path");


const storage = multer.memoryStorage(); 

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {

    const fileTypes = /jpeg|jpg|png/;
    
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (JPEG, JPG, PNG) are allowed'));
    }
  }
});

module.exports = upload;
