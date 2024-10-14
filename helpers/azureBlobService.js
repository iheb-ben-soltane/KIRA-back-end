

const { blobServiceClient, containerName } = require("../config/azureConfig");
const { v1: uuidv1 } = require("uuid");
const { URL } = require("url");

async function uploadBlob(readableStream) {
    const blobName = uuidv1(); // unique name for the blob
    const containerClient = blobServiceClient.getContainerClient(containerName); 
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); 
    await blockBlobClient.uploadData(readableStream);
  
    // return the blob URL
    const blobUrl = blockBlobClient.url;
    return blobUrl;
}
  
async function downloadBlob(blobUrl) {
  // Parse the URL to extract the blob name
  const parsedUrl = new URL(blobUrl);
  const blobName = parsedUrl.pathname.split("/").pop(); // Get the last part of the URL which is the blob name
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);
  const downloadBlockBlobResponse = await blobClient.download();
  return downloadBlockBlobResponse.readableStreamBody;
}


const getPhotoByBlobURL = async (blobURL) => {
    try {
      // Download the photo from Azure Blob Storage using the blobURL
      const photoStream = await downloadBlob(blobURL);
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
