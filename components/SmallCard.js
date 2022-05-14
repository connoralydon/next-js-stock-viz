import { dividerClasses } from "@mui/material"

const finnhubApi = process.env.FINNHUB_API_KEY;

const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi()

// let stockPrice = 0;

const displayInfo = (symbol, name) => {
    finnhubClient.quote(symbol, (error, data, response) => {
      if (data === null) {
        alert("Error finding stock");
        this.setState({ currDisplay: "" });
        return;
      }
      stockdisplayed = true;
      sum += data.c;
      staticlist.push({
        name: name,
        symbol: symbol,
        color: determinePrice(data.c, data.o),
        curr: data.c,
        shares: 1
      });
      index++;
      this.setState({ currDisplay: "" });
    });
  };




export default function({}){
    return(
        <div>
            <p>hello</p>
            <p>{Date.now()}</p>
        </div>   
        )}