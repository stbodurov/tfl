import { useContext } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../context/APIContext";
import { v4 as uuidv4 } from 'uuid';

import { IllustratedMessage } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-fiori/dist/illustrations/Connection.js";
import "@ui5/webcomponents-fiori/dist/illustrations/ErrorScreen.js";

import { isNightly } from "../utils/ServiceChecks";

const ServiceStatus = () => {
	const { id } = useParams();
	const { data } = useContext(APIContext);
	const line = data.find((line: { id: string; }) => line.id === id);
	const severeStatuses = line.lineStatuses.filter(
		(status: { statusSeverity: number; }) => status.statusSeverity < 10
	);
	const isDisrupted = !!severeStatuses.length;
	const bgColor = isDisrupted ? "bg-red-100" : "bg-green-100";

	return (
		<div className="w-full">
			<header className={"w-full " + bgColor + " pb-2"}>
				<div className="flex flex-col items-center justify-center w-auto h-24 gap-1">
					<h2 className="text-2xl font-bold">{line.name}</h2>
					<h3 className="text-lg text-gray-500">{
						!isDisrupted ? "No service disruptions" : "Service currently suffering disruptions"
					}</h3>
				</div>
				{isDisrupted &&
					<div className="flex flex-col items-center justify-center">
						<h4 className="text-lg font-semibold text-gray-600">🚨 Severity statuses:</h4>
						<ul className="flex justify-center m-2 text-sm text-gray-500 statusList">
							{severeStatuses
								.map((status: { id: number; statusSeverityDescription: string; }) =>
									<li key={uuidv4()}>{status.statusSeverityDescription}</li>
								)}
						</ul>
					</div>
				}
			</header>
				<IllustratedMessage
					className="mt-16"
					name={!isDisrupted ? "Connection" : "ErrorScreen"}
					titleText={isNightly(line) ? "This service operates at night. 🌙" : " "}
					subtitleText=" "
				/>
		</div >
	)
}

export default ServiceStatus;