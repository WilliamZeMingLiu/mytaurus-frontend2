import React, { useEffect, useState } from "react";
import { auth } from "./firebase";

//https://stackoverflow.com/questions/60156164/how-to-stop-firebase-re-auth-on-every-page-reload-in-a-react-app
//Auth API
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setPending(false);
		});
	}, []);

	if(pending) {
		return <>Loading...</>
	}

	return (
		<AuthContext.Provider
			value={{
				currentUser
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
