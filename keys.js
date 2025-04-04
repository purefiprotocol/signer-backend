import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

const generateKeys = async () => {
  const pk = generatePrivateKey();
  const acc = privateKeyToAccount(pk);
  console.log('Private Key:', pk, '\nAddress:', acc.address);
};

generateKeys();
