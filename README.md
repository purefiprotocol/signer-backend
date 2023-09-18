# signer-backend
This repository contains the code for a backend application that signs messages using the ethers library. The application provides a single endpoint for signing messages using a specified private key.

### Installation and Setup
Clone the repository to your local machine:
```bash
git clone https://github.com/purefiprotocol/signer-backend.git
```
Navigate to the project directory:
```bash
cd ethers-signer-backend
Create a .env file in the project's root directory based on the .env.sample:
```
```bash
cp .env.sample .env
```
Add your private key to the .env file under the name SIGNER_PRIVATE_KEY. This key will be used for signing messages. The private key should be in hexadecimal format.

### Install project dependencies using npm:

```bash
npm install
```

Running the Application
Execute the following command to start the backend application:

```bash
npm run start
```
The application will run on port 5000.

### Usage
To sign a message, send a POST request to the following URL:

```bash
http://localhost:5000/sign
```
Here is an example cURL request for signing a message:
```bash
curl -d '{"message":"test"}' -H "Content-Type: application/json" -H "Accept: application/json" -X POST http://localhost:5000/sign
```
The application will sign the provided message using the private key specified in the .env file and return the signature in JSON format.

License
This project is licensed under the terms of the MIT License. For more information, see the LICENSE file.
