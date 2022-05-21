const finnhub = require('finnhub');

// const key = process.env.FINNHUB_API_KEY;

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
export const finnhubClient = new finnhub.DefaultApi();

export const getAllStockSymbols = async () => {
	const data = await (await fetch(
		`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${api_key.apiKey}`
	)).json();
	return data;
};

export const getStockProfile = async (stockSymbol) => {
	console.log('Stock symbol ', stockSymbol);
	const fetcherProfile = fetch(
		`https://finnhub.io/api/v1/stock/profile2?symbol=${stockSymbol}&token=${api_key.apiKey}`
	);
	const fetcherQuote = fetch(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${api_key.apiKey}`);
	return await Promise.all([ fetcherProfile, fetcherQuote ]).then(async ([ fetchedProfile, fetchedQuote ]) => {
		const profile = await fetchedProfile.json();
		const quote = await fetchedQuote.json();
		console.log(profile, quote);
		const data = { ...profile, ...quote };
		console.log('DATA', data);
		return data;
	});
};

export const getStockData = async (value) => {
	const data = [];
	const search = '/';
	const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
	const replaceWith = '-';
	const { result, error, count } = await (await fetch(
		`https://finnhub.io/api/v1/search?q=${value}&token=${api_key.apiKey}`
	)).json();
	if (result) {
		console.log(result);
		result.forEach((item) => {
			const { displaySymbol } = item;
			if (displaySymbol !== undefined) {
				if (displaySymbol.includes('/')) {
					item.displaySymbol = displaySymbol.replace(searchRegExp, replaceWith);
				}
			}
			data.push(item);
		});
		console.log(data);
	}

	if (error) {
		console.log(new Error('An error occurred in fetching the stock symbols'));
		console.log(error);
		return error;
	}

	return { data, error };
};
