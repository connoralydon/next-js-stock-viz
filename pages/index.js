// index.js
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/ui';
import { useRouter } from 'next/router';
import Dashboard from './user/[id]';

export default function IndexPage() {
	const router = useRouter();
	const { user } = Auth.useUser();

	if (!user)
		return (
			<div className="container mx-auto max-w-2xl flex flex-col justify-center items-center p-4">
				<h1 className="text-white text-6xl font-black">Stock App</h1>
				<div id="spacer" className="h-12" />
				<div className="bg-white rounded-lg py-4 px-12">
					{/* This is the Login UI Component from SupabaseUI */}
					<Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" />
				</div>
			</div>
		);

	const userDashboardURL = `/user/${encodeURIComponent(user.id)}`;
	router.push(userDashboardURL);
	// @ts-ignore
	return <Dashboard user={user} />;
}
