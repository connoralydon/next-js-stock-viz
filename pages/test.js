import { Fragment } from 'react';
import { Container } from '../components/Container/container';
import { Loading } from '../components/Loading/Loading';
import StockElement from '../components/StockElement';
import { border, styled } from '@mui/system';
import { CenterFocusStrong } from '@material-ui/icons';
import { getAllStockSymbols, getStockProfile } from '../lib/finnhub';
import { getAllUserIds } from '../lib/supabase';
import Button from '@mui/material/Button';

const StockListWrapper = styled('div')({
	backgroundColor: 'rgba(0,0,0,0)',
	opacity: 1,
	textAlign: 'center',
	zIndex: 1,
	border: '1px solid black',
	borderRadius: '5px',
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	gap: '1rem',
	alignContent: 'center'
});

const Test = () => {
	return (
		<Fragment>
			<Button onClick={() => getAllStockSymbols()}>All stocks</Button>
			<Button onClick={() => getAllUserIds()}>All user ids</Button>
			<Button onClick={() => getStockProfile('TSLA')}>Get tesla profile</Button>
		</Fragment>
	);
};

export default Test;
