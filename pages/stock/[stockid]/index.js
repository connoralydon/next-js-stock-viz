import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from '../../../components/Loading/Loading';
import { Container } from '../../../components/Container/container';
import { StockContainer, StockPageContainer } from '../../../components/Container/stockContainer';
import { getAllStockSymbols, getStockProfile } from '../../../lib/finnhub';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import { border, spacing, styled } from '@mui/system';
import Box from '@mui/material/Box';

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

	const theme = {
		spacing: 8
	};

	// define how this is assigned due to daily changes
	const posNegValue = 'pos';

	return (
		<StockPageContainer>
			<HomeButton
				sx={{ mt: 2 }}
				onClick={() => {
					router.push('/');
				}}
				variant="contained"
			>
				Home
			</HomeButton>
			<Box sx={{ p: 2 }} />
			<StockContainer posNeg={posNegValue}>
				<h1>{data.name} Stock Profile Page</h1>
				<StockImage src={data.logo} alt={`${stockid} Logo`} />
				<h3>Market Capitalization {data.marketCapitalization}</h3>
				<h3>Current Share Value {data.shareOutstanding}</h3>
				<h3>IPO date: {data.ipo}</h3>
				<h3>Currency: {data.currency}</h3>
				<h3>Country: {data.country}</h3>
			</StockContainer>
		</StockPageContainer>
	);
};

const HomeButton = styled(Button)({
	display: 'block',
	width: '200px'
});

const StockImage = styled('img')({
	borderRadius: '10px',
	border: '1px solid black'
});

export default StockProfile;
