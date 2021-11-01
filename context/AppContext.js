import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "config/index";
import { FaTruckMonster } from "react-icons/fa";

const AppContext = createContext();

export const AppProvider = ({ children, sD = null }) => {
	const [siteData, _] = useState(sD);

	return (
		<AppContext.Provider
			value={{
				siteData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
