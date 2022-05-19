import { createContext, useContext, useState, useCallback, useMemo } from 'react';

export const SettingsContext = createContext(null);
// context hooks: These hooks make so dont have to import useContext with useUserContext, in each file
export const useSettingsContext = () => {
	return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
	const [ darkMode, setDarkMode ] = useState(false);

	const toggleMode = useCallback(() => setDarkMode((prev) => !prev), []);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			darkMode,
			setDarkMode,
			toggleMode
		}),
		[ darkMode, setDarkMode, toggleMode ]
	);

	return (
		// @ts-ignore
		<SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
	);
};
