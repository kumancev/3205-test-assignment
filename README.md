# 3205 Test Assignment

Deploy: https://3205-search-form.vercel.app/

## App Start

#### Run Backend

```bash
cd server/
npm i
touch .env && cp .env.example .env
npm run start:dev

# run tests
npm run test
```

#### Run Frontend

```bash
cd client/
npm i

# change baseUrl
# src/api/config.ts
...
const api = axios.create({
  baseURL: 'PASTE YOUR SERVER URL',
})
...

npm run dev
```
