# signer-backend

This repository contains the code for a backend application that signs messages using the viem library.
The application provides a single endpoint for signing messages using a specified private key.

## Installation and Setup

Clone the repository to your local machine:

```bash
git clone https://github.com/purefiprotocol/signer-backend.git
```

Navigate to the project directory:

```bash
cd signer-backend
```

Create a .env file in the project's root directory based on the .env.sample:

```bash
cp .env.sample .env
```

Add your private key to the .env file under the name SIGNER_PRIVATE_KEY. This key will be used for signing messages. The private key should be in hexadecimal format.

## Install project dependencies using npm:

```bash
npm install
```

## Generate private and public keys in case you need

Set (onchain) public key on PureFi Dashboard on Management tab at https://stage.dashboard.purefi.io/subscription

Set private key in .env file under the name SIGNER_PRIVATE_KEY for this application

#### REMINDER: do not forget to save the keys!!!

```bash
npm run generate:keys
```

### Running the Application

Execute the following command to start the backend application

```bash
npm run start
```

The application will run on port 4000.

### Usage

To sign a message, send a POST request to the following URL:

```bash
http://localhost:4000/sign
```

Here is an example cURL request for signing a message:

```bash
curl 'http://localhost:4000/sign' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"chainId":11155111,"payload":{"packageType":"32","ruleId":"431050","from":"0x0000000000000000000000000000000000000000","to":"0x0000000000000000000000000000000000000000","tokenData0":{"address":"0x0000000000000000000000000000000000000000","value":"1000000000000000","decimals":"18"}}}'
```

The application will sign the provided payload in EIP-712 fashion using the private key specified in the .env file and return the result message and signature in JSON format.

### License

This project is licensed under the terms of the MIT License. For more information, see the LICENSE file.
