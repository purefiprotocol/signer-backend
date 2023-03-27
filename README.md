# signer-backend

## Scrips

```bash
# install package
$ yarn
# run
$ yarn start
```

### Request

`POST /sign`

    curl -i -H 'Accept: application/json'
    http://http://127.0.0.1:3000/sign
    {
      message: string
    }
