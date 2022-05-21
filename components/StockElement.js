import React, { useState } from 'react';
import Image from 'next/image';
import { finnhubClient } from '../lib/finnhub';

import { border, styled } from '@mui/system';

const StockPageWrapper = styled('section')({
	backgroundColor: 'rgba(0,0,0,0)',
	maxWidth: '25rem',
	textAlign: 'center',
	zIndex: 1,
	border: '1px solid black',
	borderRadius: '5px'
});

export default function StockElement({ stockSymbol = 'AAPL', overwrittenName = undefined }) {
	const [ price, setPrice ] = useState(-1);
	const [ rawChange, setRawChange ] = useState(-1);
	const [ percentChange, setPercentChange ] = useState(-1);
	const [ name, setName ] = useState('');

	const [ industry, setIndustry ] = useState(null);
	const [ logoLink, setLogoLink ] = useState(null);
	const [ webLink, setWebLink ] = useState(null);

	const [ error, setError ] = useState(false);
	const [ errorNum, setErrorNum ] = useState(200);

	finnhubClient.quote(stockSymbol, (error, data) => {
		if (error) {
			console.error(error.status);
			setError(true);
			setErrorNum(429);
		}
		else {
			setPrice(data.c);
			setRawChange(data.d);
			setPercentChange(data.dp);
		}
	});

	finnhubClient.companyProfile2({ symbol: stockSymbol }, (error, data) => {
		if (error) {
			console.error(error.status);
			setError(true);
			setErrorNum(429);
		}
		else {
			setName(data.name);
			setIndustry(data.finnhubIndustry);
			setLogoLink(data.logo);
			setWebLink(data.weburl);
		}
	});

	if (error && errorNum === 429) {
		return (
			<StockPageWrapper>
				<h1>Too Many Refreshes</h1>
				<h2>Please wait a few minutes before refreshing again</h2>
				<br />
				<p>The Finnhub has a rate limit of 30/calls per minute</p>
			</StockPageWrapper>
		);
	}

	if (error) {
		return (
			<StockPageWrapper>
				<h1>Unknown Error</h1>
			</StockPageWrapper>
		);
	}

	return (
		<StockPageWrapper>
			<p>Stock Ticker: {stockSymbol}</p>
			{name !== undefined && <p>Company Name: {name}</p>}
			{overwrittenName !== undefined && <p>Company Name: {overwrittenName}</p>}
			<p>Current Price: ${price}</p>
			<p>Dollar Change: ${rawChange}</p>
			<p>Percent Change: {percentChange}%</p>
			{industry !== undefined && <p>Industry: {industry}</p>}
			{webLink !== undefined && <a href={webLink}>{name}</a>}
			{logoLink !== undefined && <img src={logoLink} alt={name + ' logo'} />}
		</StockPageWrapper>
	);
}
