# Kira - Object Rental and Product Selling Platform

**Kira** is a multiplatform application designed to facilitate the rental and sale of products and objects.

---

## 🚀 Features

- **Object Rental**: List and rent items.
- **Product Selling**: Post items for sale.
- **User Management**: Secure user accounts.
- **Category-Based Listings**: Organized item listings.

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Environment Variables](#environment-variables)
5. [API Documentation](#api-documentation)
6. [Technologies Used](#technologies-used)

---

## 🛠️ Getting Started

Follow the instructions below to get the project up and running on your local machine for development and testing purposes.

---

## 🧰 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (or `yarn`)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iheb-ben-soltane/KIRA-back-end.git
   cd KIRA-back-end
2. **Install dependencies**:
   ```bash
   npm install
3. **Setup environment variables**:
   
     - Create a **.env** file in the root directory.
   
     - Update the **.env** file with your environment-specific settings.
5. **Run the application**:
   ```bash
   npm start
6. Access the app
   
   - Visit http://localhost:5000 (or the port specified in your .env file).
  
## 🔑 Environment Variables
The application uses an .env file for configuration. Below are the variables you need to configure:
| Variable Name                      | Description                                 |
|------------------------------------|---------------------------------------------|
| `MONGO_URI`                        | MongoDB atlas connection string             |
| `JWT_SECRET`                       | Secret key for JWT authentication           |
| `PORT`                             | The port on which the app runs              |
| `AZURE_STORAGE_CONNECTION_STRING`  | Azure Storage connection string             |
| `SAS_Token`                        | Azure Shared Access Signature (SAS) token   |
| `ACCOUNT_NAME`                     | Azure Storage account name                  |
| `AZURE_STORAGE_CONTAINER_NAME`     | Azure Storage container name                |
| `BlobEndpoint`                     | Endpoint for Azure Blob Storage             |

## 📚 API Documentation
The application exposes RESTful APIs for interacting with the platform. You can test APIs in the table below using [Postman](https://www.postman.com/).
| Method   | Endpoint                        | Description                    |
|----------|---------------------------------|--------------------------------|
| `GET`    | `/api/users/users/`             | Fetch all users                |
| `POST`   | `/api/products/products/create` | Add a new product              |

## 💻 Technologies Used
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas
- **Authentication**: JWT  
- **Cloud Services**: Microsoft Azure Blob Storage

## 📞 Contact
- **Email**: hatemsiala2@gmail.com 
- **Email**: ihebbensoltane@gmail.com

