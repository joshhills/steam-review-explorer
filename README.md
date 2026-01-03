To run locally,

1. Run your own [CORS proxy](https://github.com/joshhills/cors-proxy)

2. Edit the line 13 lib/utils/SteamWebApiClient.ts from:

`const CORS_URL = 'https://joshhills.dev/cors/'`

to point to the CORS proxy 

3. Run the review explorer app

```
cd steam-review-explorer
npm install
npm run build
npm run start
```