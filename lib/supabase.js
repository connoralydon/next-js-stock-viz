// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const getAllUserIds = async () => {
	const ids = [];
	await supabase.from('users').select('id').then((response) => {
		if (response.status === 200 && response.statusText === 'OK') {
			const data = response.body;
			for (let i = 0; i < data.length; ++i) {
				ids.push(`/user/${data[i].id}`);
			}
		}
	});
	console.log({ ids });
	return {
		ids
	};
};

export const getUserById = async (id) => {
	console.log(id);
	const res = await supabase.from('users').select('*').eq('id', id);
	if (res.status === 200 && res.statusText === 'OK') {
		const user = res.body[0];
		return user;
	}
	if (res.error !== null) {
		console.log('An error occurred in fetching user data');
	}
};

export const setNamesByEmail = async (email, first_name, last_name) => {
	// const { data, error } = await supabase.from('users').update({ first_name: firstname }).match({ id });
	const { data, error } = await supabase.from('users').update({ first_name, last_name }).match({ email });
	if (error) {
		console.log(error);
		return false;
	}
	console.log(data);
	return true;
};
