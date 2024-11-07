

const { blobServiceClient, containerName } = require("../config/azureConfig");
const { v1: uuidv1 } = require("uuid");
const { URL } = require("url");
require('dotenv').config();

//uploadBlob
async function uploadBlob(readableStream, userEmail) {
  const blobName = uuidv1(); // unique name for the blob
  const containerClient = blobServiceClient.getContainerClient(`${containerName}/${userEmail}`); 
  const blockBlobClient = containerClient.getBlockBlobClient(blobName); 
  await blockBlobClient.uploadData(readableStream);
  const blobUrl = blockBlobClient.url;
  return blobUrl;
}

//download
async function downloadBlob(blobPath, userEmail) {
  try {
    const baseUrl = process.env.BlobEndpoint;
    const blobUrl = `${baseUrl}/${containerName}/${userEmail}/${blobPath}`;
    const parsedUrl = new URL(blobUrl);
    const blobName = decodeURIComponent(parsedUrl.pathname.split("/").pop()); // Decode blob name
    const containerClient = blobServiceClient.getContainerClient(`${containerName}/${userEmail}`);
    const blobClient = containerClient.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download();
    return downloadBlockBlobResponse.readableStreamBody;

  } catch (error) {
    console.error("Error downloading the photo:", error.message);
    throw new Error("Failed to download the photo");
  }
}


const getPhotoByBlobURL = async (blobURL,userEmail) => {
    try {
      const photoStream = await downloadBlob(blobURL,userEmail);
      return photoStream;
    } catch (error) {
      console.error("Error downloading the photo:", error);
      throw new Error("Failed to download the photo");
    }
};



// async function deleteBlob(containerName, blobName) {
//   try {
//     const containerClient = blobServiceClient.getContainerClient(containerName);
//     const blobClient = containerClient.getBlobClient(blobName);
//     await blobClient.delete();
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to delete blob");
//   }
// }



module.exports = {
  uploadBlob,
  downloadBlob,
  // deleteBlob,
  getPhotoByBlobURL
};
