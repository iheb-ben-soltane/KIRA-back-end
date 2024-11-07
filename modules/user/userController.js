const asyncHandler = require('express-async-handler');
const User = require('../user/userModel');
const { uploadBlob, getPhotoByBlobURL } = require('../../helpers/azureBlobService');

// Get all users
const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // Return the users
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Get user by ID
const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      return next({ messageKey: 'error.user_not_found' });
    }
    res.status(200).json(user); // Return the user
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Add a photo to a user
const addPhotoToUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id; // from the JWT
  const photo = req.file?.buffer; // get the file from the request
 
  try {
    // Check if there's a file
    if (!req.file) {
      res.status(400);
      return next({ messageKey: 'error.no_file_uploaded' });
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      return next({ messageKey: 'error.user_not_found' });
    }
    console.log("user email",user.email);
    const blobURL = await uploadBlob(photo,user.email); // Upload the photo to Azure Blob Storage

    user.photo = blobURL;
    await user.save();

    res.status(200).json({
      message: 'Photo added successfully',
    });
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Get the photo of a user
const getPhotoFromUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId); // Retrieve the user from the database

    if (!user || !user.photo) {
      res.status(404);
      return next({ messageKey: 'error.photo_not_found' });
    }

    const photoStream = await getPhotoByBlobURL(user.photo,user.email); // Get the photo from Azure Blob Storage

    // Pipe the photo directly to the response
    photoStream.pipe(res);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

module.exports = {
  getAllUsers,
  getUserById,
  addPhotoToUser,
  getPhotoFromUser
};
