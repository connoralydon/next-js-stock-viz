import { createContext, useContext, useMemo } from 'react';
import { Auth } from '@supabase/ui';

export const UserContext = createContext(null);
// context hooks: These hooks make so dont have to import useContext with useUserContext, in each file
export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const { user } = Auth.useUser();
	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			user
		}),
		[ user ]
	);

	return (
		// @ts-ignore
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};
