// _app.js
import { Fragment } from 'react';
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/ui';
import { UserProvider } from '../context/UserContext';
import { StocksProvider } from '../context/StocksContext';
import { SettingsProvider } from '../context/SettingContext';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Fragment>
			<Head>
				<title>Stock Search</title>
				<link rel="shortcut icon" href="/images/stock.png" />
			</Head>
			<Auth.UserContextProvider supabaseClient={supabase}>
				<SettingsProvider>
					<UserProvider>
						<StocksProvider>
							<Component {...pageProps} />
						</StocksProvider>
					</UserProvider>
				</SettingsProvider>
			</Auth.UserContextProvider>
		</Fragment>
	);
}

export default MyApp;
