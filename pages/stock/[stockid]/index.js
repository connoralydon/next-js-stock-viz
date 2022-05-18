import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from '../../../components/Loading/Loading';
import { Container } from '../../../components/Container/container';
import { getAllStockSymbols, getStockProfile } from '../../../lib/finnhub';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';

export async function getStaticPaths({ params }) {
	const search = '/';
	const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
	const replaceWith = '-';

	const data = await getAllStockSymbols();
	const symbols = [];

	if (data) {
		data.forEach(({ displaySymbol }) => {
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
	const data = await getStockProfile(stockid);
	console.log('HERE');
	console.log(data);
	return {
		props: {
			stockid,
			data: { ...data }
		}
	};
}

const StockProfile = ({ stockid, data }) => {
	const router = useRouter();
	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			if (data !== undefined) {
				setLoading(false);
			}
		},
		[ data ]
	);

	if (loading) {
		return <Loading />;
	}

	return (
		<Container>
			<h1>{data.name} Stock Profile Page</h1>
			<img src={data.logo} alt={`${stockid} Logo`} height={200} width={200} />
			<h3>Market Capitalization {data.marketCapitalization}</h3>
			<h3>Current Share Value {data.shareOutstanding}</h3>
			<h3>IPO date: {data.ipo}</h3>
			<h3>Currency: {data.currency}</h3>
			<h3>Country: {data.country}</h3>
			<Button
				onClick={() => {
					router.push('/');
				}}
			>
				Home
			</Button>
		</Container>
	);
};

export default StockProfile;
