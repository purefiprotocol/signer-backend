import express from 'express';
import bodyParser from 'body-parser';
import { Wallet } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;

if (!SIGNER_PRIVATE_KEY) {
  throw new Error(
    'Create and set up .env file in the root folder using .env.sample as an example'
  );
}

const signer = new Wallet(SIGNER_PRIVATE_KEY);

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) =>
  res.json({
    success: true,
  })
);

app.post('/sign', async (req, res) => {
  const message = req?.body?.message;

  if (!message) {
    return res.status(400).json({
      error: 'message required',
    });
  }

  if (typeof message !== 'string') {
    return res.status(400).json({
      error: 'message must be a string',
    });
  }

  try {
    const signature = await signer.signMessage(message);
    const response = {
      message,
      signature,
    };
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Signer backend app is listening on port ${PORT}`);
});
