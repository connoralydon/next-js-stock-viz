const finnhub = require('finnhub');

// const key = process.env.FINNHUB_API_KEY;

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
export const finnhubClient = new finnhub.DefaultApi()
