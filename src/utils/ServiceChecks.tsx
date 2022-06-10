const isNightly = (line: { id: string; name: string; serviceTypes: any[] }) =>
	line.serviceTypes.some((type) => type.name === "Night");

const isDisrupted = (line: {
	id: string;
	name: string;
	serviceTypes: object[];
	lineStatuses: object[];
}) =>
	line.lineStatuses.some(
		(status: { statusSeverity: number }) => status.statusSeverity < 10
	);

export { isNightly, isDisrupted };
