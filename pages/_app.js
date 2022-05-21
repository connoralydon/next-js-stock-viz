// _app.js
import { Fragment, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/ui';
import { UserProvider } from '../context/UserContext';
import { StocksProvider } from '../context/StocksContext';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { Loading } from '../components/Loading/Loading';
import useDarkMode from 'use-dark-mode';
import { light, dark } from '../styles/theme';

const GlobalStyle = createGlobalStyle`
html,
body,
#__next {
	height: 100%;
	padding: 0;
	margin: 0;
	font-family: 'Montserrat', sans-serif;
}

html {
	position: relative;
}

body {

}

body::after {
	content: '';
	height: 100%;
	width: 100%;
	position: absolute;
	background-image: url("/images/bearbull.jpeg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	z-index: -1;
	opacity: ${({ theme }) => theme.opacity};
}

a {
	color: inherit;
	text-decoration: none;
}

* {
	box-sizing: border-box;
}
`;

function MyApp({ Component, pageProps }) {
	const darkMode = useDarkMode(false, { storageKey: 'darkMode', onChange: null });
	const { value } = darkMode;
	const chosenTheme = value ? dark : light;
	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			if (darkMode !== null || darkMode !== undefined) {
				setLoading(false);
			}
		},
		[ darkMode ]
	);

	if (loading) {
		return <Loading />;
	}

	return (
		<ThemeProvider theme={chosenTheme}>
			<Fragment>
				<Head>
					<title>Stock Search</title>
					<link rel="shortcut icon" href="/images/stock.png" />
				</Head>

				<GlobalStyle />
				<Auth.UserContextProvider supabaseClient={supabase}>
					<UserProvider>
						<StocksProvider>
							<Component {...pageProps} darkMode={darkMode} chosenTheme={chosenTheme} />
						</StocksProvider>
					</UserProvider>
				</Auth.UserContextProvider>
			</Fragment>
		</ThemeProvider>
	);
}

export default MyApp;
