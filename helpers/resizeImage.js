const sharp = require('sharp'); 

// Function to resize image if it's larger than 1MB
exports.resizeImageIfNeeded = async (imageBuffer) => {
  // Check if the image is larger than 1MB (1048576 bytes)
  if (imageBuffer.length > 1048576) { 
    // Resize the image to a smaller size, keeping the aspect ratio
    const resizedBuffer = await sharp(imageBuffer)
      .resize(800) // Resize width to 800px, height will adjust automatically
      .toBuffer(); 
    console.log('Image',imageBuffer.length,'Image resized',resizedBuffer.length);
    return resizedBuffer;
  }
  return imageBuffer; // Return original if under 1MB
};