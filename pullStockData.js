const dotenv = require("dotenv");
const env = dotenv.config();
const request = require("request");

const apiURIBuilder = (type, ticker, key) => {
  let URI = "";
  if (type === "Quote Endpoint") {
    URI = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=" + key;
  }

  return URI;
};

let URI = apiURIBuilder("Quote Endpoint", "TSLA", env.stock_API_key);

console.log(URI);

request(URI, { json: true }, (err, res, body) => {
  console.log(body);
  /**
    {
     'Global Quote': {
        '01. symbol': 'TSLA',
        '02. open': '601.5450',
        '03. high': '606.4599',
        '04. low': '559.6500',
        '05. price': '571.6900',
        '06. volume': '44184916',
        '07. latest trading day': '2021-05-13',
        '08. previous close': '589.8900',
        '09. change': '-18.2000',
        '10. change percent': '-3.0853%'
        }
    }
   */

  const globalQuote = body["Global Quote"];
  const lastClose = globalQuote["08. previous close"];
  console.log(lastClose);

  if (err) {
    return console.log(err);
  }
});
