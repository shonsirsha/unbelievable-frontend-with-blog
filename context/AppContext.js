import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "config/index";
import { FaTruckMonster } from "react-icons/fa";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [siteData, setSiteData] = useState(null);

	useEffect(() => {
		async function fetchSiteData() {
			const resSiteData = await fetch(`${API_URL}/sitedata`, {
				method: "GET",
			});

			const siteD = await resSiteData.json();
			setSiteData(siteD);
			//siteData will be useful for site-wide data
			//that don't change frequently.

			// For example, some of the content in the footer.
			// This means, it requires user's hard refresh
			// to see the changes if any was made.
		}
		fetchSiteData();
	}, []);
	return (
		<AppContext.Provider
			value={{
				siteData,
				setSiteData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
