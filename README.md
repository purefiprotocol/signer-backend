# signer-backend

## Setup

1. Install dependencies

```bash
npm install
```

2. Create and set up .env file in the root folder using .env.sample as an example
3. Run the app

```bash
npm start
```

## Example

```bash
curl -d '{"message":"test"}' -H "Content-Type: application/json" -H "Accept: application/json" -X POST http://localhost:5000/sign
```
