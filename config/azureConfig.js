const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

module.exports = {
  blobServiceClient,
  containerName,
};