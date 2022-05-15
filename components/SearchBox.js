


// const finnhub = require('finnhub');

// // const key = process.env.FINNHUB_API_KEY;

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = 'c9vj6viad3i5k782pmpg';
// const finnhubClient = new finnhub.DefaultApi()

import { finnhubClient } from '../lib/finnhub';

finnhubClient.symbolSearch('AAPL', (error, data, response) => {
  console.log(data)
});

export default function SearchBox(props){
    
}