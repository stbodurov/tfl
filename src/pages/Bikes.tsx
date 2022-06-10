import { useState, useEffect, useCallback, SetStateAction } from "react";
import { IllustratedMessage } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-fiori/dist/illustrations/NoSearchResults.js";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";

interface BikePathProps {
	id: string;
	commonName: string;
	lat: number;
	lon: number;
}

const Bikes = () => {
	const [query, setQuery] = useState("");
	const [data, setData] = useState([] as BikePathProps[]);
	const [cache, setCache] = useState({});

	const changeHandler = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setQuery(event.target.value);
	};

	// Delay API call by 300ms from last change event
	const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

	useEffect(() => {
		if (cache.hasOwnProperty(query)) {
			setData(cache[query]);
		} else if (query) {
			fetch(`https://api.tfl.gov.uk/BikePoint/Search?query=${query}`)
				.then((res) => res.json())
				.then((data) => {
					setCache({ ...cache, [query]: data });
				});
		}
	}, [query, cache]);

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<header className={"w-full bg-gray-100 px-5 pb-2 text-center"}>
				<div className="flex flex-col items-center justify-center w-auto h-24 gap-1">
					<h2 className="text-2xl font-bold">🚲 Search for bike points</h2>
				</div>
			</header>
			<input
				onChange={debouncedChangeHandler}
				className="w-64 p-4 mt-12 mb-6 bg-gray-200 md:w-80 h-18 hover:bg-gray-300 text-gray rounded-3xl"
				type="text"
				placeholder="Longford Street..."
			/>
			{query && data.length ? (
				<div className="flex-col w-full flex-center">
					<ul className="flex-col m-2 text-sm text-gray-500 flex-center">
						{data
							.slice(0, 10)
							.map(({ id, commonName, lat, lon }: BikePathProps) => (
								<li
									key={uuidv4()}
									className="p-4 w-full min-h-[3rem] bg-gray-100 font-semibold
										mb-4 rounded-3xl flex-center text-ellipsis"
								>
									<p>{`${id.split("_")[1]} ${commonName} (${lat}, ${lon})`}</p>
								</li>
							))}
					</ul>
				</div>
			) : (
				<IllustratedMessage
					className="mt-8"
					name={query ? "NoSearchResults" : "BeforeSearch"}
					titleText={query ? `No bike points found for '${query}'` : " "}
					subtitleText=" "
				/>
			)}
		</div>
	);
};

export default Bikes;
