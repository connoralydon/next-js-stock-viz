import { Container } from '../components/Container/container';
import { Loading } from '../components/Loading/Loading';
import StockElement from '../components/StockElement';
import { border, styled } from '@mui/system';
import { CenterFocusStrong } from '@material-ui/icons';

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
		<StockListWrapper>
			<StockElement stockSymbol='SPY' overwrittenName='SP-500 Index'/ >
			<StockElement stockSymbol='QQQ' overwrittenName='NASDAQ-100 Index'/ >
			<StockElement stockSymbol='AAPL'/ >
			<StockElement stockSymbol='MSFT'/ >
		</StockListWrapper>
	);
};

export default Test;
