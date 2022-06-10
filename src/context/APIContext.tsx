import React, { createContext, useEffect, useState } from "react";

interface APIContextType extends React.Context<{
    data: any[];
    isLoading: boolean;
}> {};

type Lines = {
	$type: string,
        id: string,
        name: string,
        modeName: string,
        disruptions: any[],
        created: string, // date: 'YYYY-MM-DDTHH:MM:SSZ'
        modified: string, // date: 'YYYY-MM-DDTHH:MM:SSZ'
        lineStatuses: object[],
        routeSections: [],
        serviceTypes: [
            {
                $type: string,
                name: string,
                uri: string
            }
        ],
        crowding: {
            $type: string,
        }
}

const APIContext: APIContextType = createContext({
	data: [],
	isLoading: true
});

const APIContextProvider = ({children}: React.PropsWithChildren): JSX.Element => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const sortData = (data: Lines[]) => {
		return data.sort((a, b) => {
			const compareNodeName = a.modeName.localeCompare(b.modeName);
			const compareName = a.name.localeCompare(b.name);

			return compareNodeName || compareName;
		})
	};

	useEffect(() => {
		fetch("https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true")
			.then(res => res.json())
			.then(data => {
				const sortedData = sortData(data);
				setData(sortedData);
				setIsLoading(false);
			});

	}, []);

	return (
		<APIContext.Provider value={{data, isLoading}}>
			{children}
		</APIContext.Provider>
	);
}

export {
	APIContext,
	APIContextProvider
};