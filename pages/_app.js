// _app.js
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/ui';
import { UserProvider } from '../context/UserContext';
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
	return (
		<Auth.UserContextProvider supabaseClient={supabase}>
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</Auth.UserContextProvider>
	);
}

export default MyApp;
