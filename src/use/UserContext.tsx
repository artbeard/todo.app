import { createContext, useState, useContext, ReactElement, ReactNode } from 'react'
import { getUid } from './getUser'

interface IProps{
	children?: ReactNode | ReactElement
}

type tUid = number | null | undefined;

interface IUserContext{
	currentUid: tUid;
	setUid: (newUid: tUid) => void;
}

const UserContext  = createContext({} as IUserContext);

export const useUserContext = () => {
	return useContext(UserContext);
}

export const UserProvider = ({ children }: IProps) => {
	
	const [currentUid, setCurrentUid] = useState(getUid() as tUid);
	const setUid = (newUid: tUid) => setCurrentUid(newUid);

	return (
		<UserContext.Provider value={{
				currentUid,
				setUid: setUid
			}}>
			{children}
		</UserContext.Provider>
	);
}