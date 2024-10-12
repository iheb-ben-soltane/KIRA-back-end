const multer = require("multer");
const path = require("path"); // Required to extract file extensions

// memory storage (can be changed to disk storage if needed)
// la79i9a lezm nhcoufou ama 5ir memory wala disk
const storage = multer.memoryStorage(); 

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {

    const fileTypes = /jpeg|jpg|png/;
    
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // check the extension ( .png .jpg .jpeg )
    const mimetype = fileTypes.test(file.mimetype); // check the MIME type ( ensures it's a photo )

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (JPEG, JPG, PNG) are allowed')); //iheb taw yrigelha
    }
  }
});

module.exports = upload;
