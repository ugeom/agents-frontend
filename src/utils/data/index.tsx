// React imports
import { useContext, createContext } from 'react';

// App imports
import { providers } from './providers';
import { basemaps } from './basemaps';

const DataContext: React.Context<any> = createContext(null)

export const useData = () => useContext(DataContext)

export const DataProvider = ({children}: any) => {
	return (
		<DataContext.Provider value={{ providers, basemaps }}>
			{children}
		</DataContext.Provider>
	)
}

DataContext.displayName = "DataContext";