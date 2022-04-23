# invoices-dashboard

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# testing using Cypress
$ yarn e2e
$ yarn e2e:silent # for silent run
```

## Environment Setup

```
# update /api-client/index.js and point it to the api of your backend
const apiClient = axios.create({
  baseURL: 'YOUR_API_ENDPOINT', // <- this line
  headers: {
    'Accept': 'application/json',
  }
});
```
