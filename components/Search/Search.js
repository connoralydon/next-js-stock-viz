import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { getStockData } from '../../lib/finnhub';
import { useStocksContext } from '../../context/StocksContext';
import { styled } from '@mui/system';
import { useState } from 'react';

const Form = styled('form')({
	height: '100%',
	width: '80%',
	display: 'flex',
	alignItems: 'center',
	padding: '2px 4px',
	margin: '0 auto',
	border: 'solid grey 2px',
	borderRadius: '4px'
});
export const Search = ({ setLoading, setData, setErrorStatus, setErrorMsg, chosenTheme }) => {
	const { stocks } = useStocksContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrorStatus(false);
		setLoading(true);

		getStockData(value).then(({ data, error }) => {
			if (data) {
				// filter stocks
				const filteredData = [];
				for (let i = 0; i < data.length; ++i) {
					if (stocks.includes(data[i].symbol)) {
						filteredData.push(data[i]);
					}
				}
				setErrorStatus(false);
				setData(filteredData);
				setLoading(false);
			}
			if (error) {
				setErrorStatus(true);
				setErrorMsg(error.message);
				setLoading(false);
			}
		});
	};

	const clearResults = () => setData([]);

	const [ value, setValue ] = useState('');
	const { primary } = chosenTheme.text;
	return (
		<Form onSubmit={(e) => handleSubmit(e)}>
			<InputBase
				sx={{
					ml: 1,
					flex: 1,
					color: primary,
					'& ::placeholder': {
						color: primary
					}
				}}
				placeholder="Search Stock Ticker or Symbol"
				inputProps={{ 'aria-label': 'search stocks' }}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<IconButton type="submit" color="success" sx={{ p: '10px' }} aria-label="search" disabled={value === ''}>
				<SearchIcon />
			</IconButton>
			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
			<IconButton type="button" color="success" sx={{ p: '10px' }} aria-label="clear" onClick={clearResults}>
				<ClearIcon />
			</IconButton>
		</Form>
	);
};
