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

	if (data !== undefined && data !== null) {
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
	console.log(data, stockid);
	const router = useRouter();
	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			if (Object.keys(data).length === 0 || data !== undefined || data !== null) {
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
	let posNegValue = 0;
	if (data.dp > 0) {
		posNegValue = 1;
	}
	else if (data.dp < 0) {
		posNegValue = -1;
	}
	else {
		posNegValue = 0;
	}

	const roundOne = (num) => {
		return +(Math.round(num + 'e+1') + 'e-1');
	};

	// const numberWithCommas = (x) => {
	// 	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	// };

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
				<StockTable>
					<tbody>
						<StockRow>
							<StockTableData>
								<h2>Metric</h2>
							</StockTableData>
							<StockTableData>
								<h2>Value</h2>
							</StockTableData>
						</StockRow>
						<StockRow>
							<StockTableData>
								<h3>Current Price:</h3>
							</StockTableData>
							<StockTableData>
								<h3>${data.c}</h3>
							</StockTableData>
						</StockRow>
						<StockRow>
							<StockTableData>
								<h3>Day Change:</h3>
							</StockTableData>
							<StockTableData>
								<h3>
									${data.d} ({roundOne(data.dp)}%)
								</h3>
							</StockTableData>
						</StockRow>
						<StockRow>
							<StockTableData>
								<h3>Market Cap:</h3>
							</StockTableData>
							<StockTableData>
								<h3>${Math.round(data.marketCapitalization)} Million</h3>
							</StockTableData>
						</StockRow>
						<StockRow>
							<StockTableData>
								<h3>IPO date:</h3>
							</StockTableData>
							<StockTableData>
								<h3>{data.ipo}</h3>
							</StockTableData>
						</StockRow>
						<StockRow>
							<StockTableData>
								<h3>Country:</h3>
							</StockTableData>
							<StockTableData>
								<h3>{data.country}</h3>
							</StockTableData>
						</StockRow>
					</tbody>
				</StockTable>
			</StockContainer>
		</StockPageContainer>
	);
};

const StockTable = styled('table')({
	border: '1px solid black',
	borderSpacing: 0,
	textAlign: 'left'
});
const StockRow = styled('tr')({
	border: '1px solid black'
});
const StockTableData = styled('td')({
	border: '1px solid black',
	padding: '5px'
});

const HomeButton = styled(Button)({
	display: 'block',
	width: '200px'
});

const StockImage = styled('img')({
	borderRadius: '10px',
	border: '1px solid black'
});

export default StockProfile;
