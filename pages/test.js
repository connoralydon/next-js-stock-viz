import { Container } from '../components/Container/container';
import { Loading } from '../components/Loading/Loading';
import StockElement from '../components/StockPage';

const Test = () => {
	return (
		<Container>
			<StockElement stockSymbol='SPY'/ >
			<StockElement stockSymbol='QQQ'/ >
			<StockElement stockSymbol='AAPL'/ >
			<StockElement stockSymbol='MSFT'/ >
		</Container>
	);
};

export default Test;
