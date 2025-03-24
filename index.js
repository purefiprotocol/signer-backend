import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { privateKeyToAccount } from 'viem/accounts';
import { createDomain, createRuleV5Types } from '@purefi/verifier-sdk';

import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;

if (!SIGNER_PRIVATE_KEY) {
  throw new Error(
    'Create and set up .env file in the root folder using .env.sample as an example'
  );
}

const walletAccount = privateKeyToAccount(SIGNER_PRIVATE_KEY);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) =>
  res.json({
    success: true,
  })
);

app.post('/sign', async (req, res) => {
  const payload = req?.body?.payload;
  const chainId = req?.body?.chainId;

  if (!payload) {
    return res.status(400).json({
      error: 'payload required',
    });
  }

  if (!chainId) {
    return res.status(400).json({
      error: 'chainId required',
    });
  }

  try {
    const address = walletAccount.address;

    const message = {
      account: {
        address,
      },
      chain: {
        id: chainId.toString(),
      },
      payload,
    };

    const domain = createDomain('PureFi', chainId.toString());

    const types = createRuleV5Types(payload);

    const primaryType = 'Data';

    const signature = await walletAccount.signTypedData({
      domain,
      types,
      primaryType,
      message,
    });

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
