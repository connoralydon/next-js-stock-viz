import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getStockData } from '../../lib/finnhub';
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
export const Search = ({ setLoading, setData, setErrorStatus, setErrorMsg }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrorStatus(false);
		setLoading(true);

		getStockData(value).then(({ data, error }) => {
			console.log(data, error);
			if (data) {
				setErrorStatus(false);
				setData(data);
				setLoading(false);
			}
			if (error) {
				setErrorStatus(true);
				setErrorMsg(error.message);
				setLoading(false);
			}
		});

		// finnhubClient.search(value, (error, data, response) => {

		// 	if (data) {
		// 		setErrorStatus(false);
		// 		setData(data);
		// 		setLoading(false);
		// 	}
		// 	if (error) {
		// 		setErrorStatus(true);
		// 		setErrorMsg(error.message);
		// 		setLoading(false);
		// 	}
		// });
	};

	const [ value, setValue ] = useState('');
	return (
		<Form onSubmit={(e) => handleSubmit(e)}>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search stocks"
				inputProps={{ 'aria-label': 'search stocks' }}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<IconButton type="submit" sx={{ p: '10px' }} aria-label="search" disabled={value === ''}>
				<SearchIcon />
			</IconButton>
			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
		</Form>
	);
};