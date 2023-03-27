import express from 'express';
import { Wallet, JsonRpcProvider } from 'ethers';
import bodyParser from 'body-parser';

const port = 3000;
const app = express();
app.use(bodyParser.json())

const sign = async (message) => {
  const provider = new JsonRpcProvider(
    "https://bsc-dataseed1.binance.org",
    {
      chainId: 56,
      name: "bsc-mainnet",
    }
  );
  const privateKey = '0c25287fba0ccfbdf242d749ee0709ceb185f17b6c9877b9bdd47cc7929cccb4';
  
  const signer = new Wallet(privateKey, provider);
  const signature = await signer.signMessage(message);

  return {
    message,
    signature,
  }
}
app.get('/', (req, res) => res.send('Is working'))

app.post('/sign', async (req, res) => {
  const message = req?.body?.message;

  if(!message) {
    res.status(400).send('message: required');
    return;
  }

  if(typeof message !== 'string') {
    res.status(400).send('message: type must be string');
    return;
  }

  try {
    const result = await sign(message);
    res.status(200).send(result);
  }catch(err) {
    res.status(400).send(err);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})