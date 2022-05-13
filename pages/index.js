// index.js
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/ui';

export default function IndexPage() {
	const { user } = Auth.useUser();

	return (
		<div className="bg-gray-700 min-h-screen min-w-screen">
			<div id="spacer" className="h-12" />

			{/* 
				* Check if user is logged in or not. 
				* If not, display the login UI
				* If logged in, display the app 
				* & pass the user in as props
				*/
			!user ? (
				<div className="container mx-auto max-w-2xl flex flex-col justify-center items-center p-4">
					<h1 className="text-white text-6xl font-black">Gratitude Journal</h1>
					<div id="spacer" className="h-12" />
					<div className="bg-white rounded-lg py-4 px-12">
						{/* This is the Login UI Component from SupabaseUI */}
						<Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" />
					</div>
				</div>
			) : (
				<div className="container mx-auto max-w-prose px-4">
					<h1>Logged in</h1>
					<div id="spacer" className="h-12" />
					<button
						className="text-pink-300 font-semibold"
						onClick={async () => {
							const { error } = await supabase.auth.signOut();
							if (error) console.log('Error logging out:', error.message);
						}}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}
