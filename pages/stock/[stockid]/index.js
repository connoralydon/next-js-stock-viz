import { Container } from '../../../components/Container/container';
import { getAllStockSymbols } from '../../../lib/finnhub';

export async function getStaticPaths({ params }) {
	console.log('here');
	const { symbols } = await getAllStockSymbols();
	console.log(symbols);
	const paths = symbols;
	console.log(Array.isArray(paths));
	console.log(paths);
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const { stockid } = params;
	console.log(stockid);
	return {
		props: {
			stockid
		}
	};
}

const StockProfile = () => {
	return (
		<Container>
			<h1>Stock page</h1>
		</Container>
	);
};

export default StockProfile;
