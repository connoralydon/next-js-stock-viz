const finnhub = require('finnhub');

// const key = process.env.FINNHUB_API_KEY;

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
export const finnhubClient = new finnhub.DefaultApi();

export const getAllStockSymbols = async () => {
	const symbols = [];
	const search = '/';
	const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
	const replaceWith = '-';
	const { result, error, count } = await (await fetch(
		`https://finnhub.io/api/v1/search?q=&token=${api_key.apiKey}`
	)).json();
	if (result) {
		result.forEach(({ displaySymbol }) => {
			if (displaySymbol !== undefined) {
				if (displaySymbol.includes('/')) {
					displaySymbol = displaySymbol.replace(searchRegExp, replaceWith);
				}
				symbols.push(`/stock/${displaySymbol}`);
			}
			else {
				symbols.push(404);
			}
		});
	}

	if (error) {
		console.log(new Error('An error occurred in fetching the stock symbols'));
		console.log(error);
		return error;
	}

	return { symbols, error };
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
