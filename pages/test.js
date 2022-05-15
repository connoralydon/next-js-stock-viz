import { Container } from '../components/Container/container';
import { Loading } from '../components/Loading/Loading';
import StockElement from '../components/StockElement';

const Test = () => {
	return (
		<Container>
			<StockElement stockSymbol='SPY' overwrittenName='SP-500 Index'/ >
			<StockElement stockSymbol='QQQ' overwrittenName='NASDAQ-100 Index'/ >
			<StockElement stockSymbol='AAPL'/ >
			<StockElement stockSymbol='MSFT'/ >
		</Container>
	);
};

export default Test;
