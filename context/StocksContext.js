import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { getAllStockSymbols } from '../lib/finnhub';

export const StocksContext = createContext(null);
// context hooks: These hooks make so dont have to import useContext with useUserContext, in each file
export const useStocksContext = () => {
	return useContext(StocksContext);
};

export const StocksProvider = ({ children }) => {
	const [ stocks, setStocks ] = useState([]);

	const fetchStocks = useCallback(async () => {
		const symbols = [];
		const search = '/';
		const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
		const replaceWith = '-';

		const data = await getAllStockSymbols();
		console.log('data', data);
		if (data !== undefined && data !== null) {
			data.forEach(({ displaySymbol }) => {
				if (displaySymbol !== undefined) {
					if (displaySymbol.includes('/')) {
						displaySymbol = displaySymbol.replace(searchRegExp, replaceWith);
					}
					symbols.push(displaySymbol);
				}
				else {
					symbols.push(404);
				}
			});
		}
		setStocks(symbols);
	}, []);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			stocks,
			setStocks,
			fetchStocks
		}),
		[ stocks, setStocks, fetchStocks ]
	);

	return (
		// @ts-ignore
		<StocksContext.Provider value={contextValue}>{children}</StocksContext.Provider>
	);
};
