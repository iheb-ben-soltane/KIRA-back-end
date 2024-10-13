const asyncHandler = require('express-async-handler');
const User = require('../user/userModel');
const { uploadBlob,getPhotoByBlobURL } = require('../helpers/azureBlobService');


// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find(); 
  res.status(200).json(users); // Return the users
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }
  res.status(200).json(user); // Return the user
});


// Add a photo to a user
const addPhotoToUser = asyncHandler(async (req, res) => {

  const userId = req.user.id; //from the jwt
  const photo = req.file.buffer; // get the file from the request

  // Check if there's a file
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const blobURL = await uploadBlob(photo); // Upload the photo to Azure Blob Storage

  user.photo = blobURL;
  await user.save();

  res.status(200).json({
    message: 'Photo added successfully',
  });

});



// const getPhotoFromUser = async (blobURL) => {
//   try {
//     // Download the photo blob from Azure Blob Storage
//     const photoStream = await downloadBlob(blobURL);
//     return photoStream;
//   } catch (error) {
//     throw new Error("Failed to get photo from user");
//   }
// };


// get the photo of a user
const getPhotoFromUser = asyncHandler(async (req, res) => {
  const userId = req.params.id; 
  const user = await User.findById(userId); // Retrieve the user from the database

  if (!user || !user.photo) {
    res.status(404).json({ message: 'Photo not found' });
    return;
  }

  const photoStream = await getPhotoByBlobURL(user.photo);

  // we must set the correct content type before sending the image
  // res.setHeader('Content-Type', 'image/jpeg'); // Adjust this based on the actual file type

  // pipe the photo directly to the response
  photoStream.pipe(res);
});


module.exports = {
  getAllUsers,
  getUserById,
  addPhotoToUser,
  getPhotoFromUser
};