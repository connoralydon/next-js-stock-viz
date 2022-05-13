import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export const UserContext = createContext(null);
// context hooks: These hooks make so dont have to import useContext with useUserContext, in each file
export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	let router = useRouter();

	const [ user, setUser ] = useState(null);

	const logout = useCallback(
		async () => {
			const { error } = await supabase.auth.signOut();
			if (error) console.log('Error logging out:', error.message);
			else {
				router.push('/');
				window.localStorage.clear();
			}
		},
		[ router ]
	);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			user,
			logout
		}),
		[ user, logout ]
	);

	return (
		// @ts-ignore
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};
