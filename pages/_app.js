// _app.js
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/ui';

function MyApp({ Component, pageProps }) {
	return (
		<Auth.UserContextProvider supabaseClient={supabase}>
			<Component {...pageProps} />
		</Auth.UserContextProvider>
	);
}

export default MyApp;
