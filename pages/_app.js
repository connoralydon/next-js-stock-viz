// _app.js
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/ui';
import { UserProvider } from '../context/UserContext';
import { StocksProvider } from '../context/StocksContext';
import { SettingsProvider } from '../context/SettingContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Auth.UserContextProvider supabaseClient={supabase}>
			<SettingsProvider>
				<UserProvider>
					<StocksProvider>
						<Component {...pageProps} />
					</StocksProvider>
				</UserProvider>
			</SettingsProvider>
		</Auth.UserContextProvider>
	);
}

export default MyApp;
