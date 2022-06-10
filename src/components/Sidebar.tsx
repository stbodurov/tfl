import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { APIContext } from "../context/APIContext";
import { isNightly, isDisrupted } from "../utils/ServiceChecks";

interface SidebarProps {
	show: boolean;
	setShow: Function;
}

const Sidebar: React.FC<SidebarProps> = ({
	show,
	setShow,
}: SidebarProps): React.ReactElement => {
	const { data } = useContext(APIContext);

	return (
		<nav
			className={`navbar z-40 shadow-2xl md:shadow-none absolute top-0 left-0 
					md:fixed bg-gray-100 w-72 h-[100%] flex flex-col ml-[-18rem] ${show && "ml-0"}`}
			onClick={() => window.innerWidth < 768 && setShow(false)}
		>
			<div className="flex items-center justify-between p-5">
				<Link to="/">
					<h1 className="flex-grow-0 flex-shrink text-2xl font-bold text-center basis-auto">
						🚇 Services
					</h1>
				</Link>
				<button
					className="flex-center bg-gray-200
					active:bg-gray-300 mb- w-12 h-12 font-[550]
					rounded-3xl text-lg hover:shadow-md"
					onClick={() => setShow(false)}
				>
					X
				</button>
			</div>
			<ul className="flex flex-col items-center justify-start flex-grow flex-shrink px-4 py-2 overflow-scroll overflow-x-hidden h-52 basis-auto">
				{data.map(
					(line: {
						id: string;
						name: string;
						serviceTypes: object[];
						lineStatuses: object[];
					}) => (
						<Link
							to={`/lines/${line.id}`}
							key={uuidv4()}
							className="w-full min-h-[3rem] bg-gray-200 hover:shadow-md
								active:bg-gray-300 mb-4 rounded-3xl flex-center"
						>
							<li>
								{line.name}
								{isNightly(line) && " 🌙"}
								{isDisrupted(line) && " 🚨"}
							</li>
						</Link>
					)
				)}
			</ul>
			<Link
				to={`/bikes`}
				className="w-[90%] h-4 bg-green-500 text-white
					hover:shadow-md active:bg-green-600 m-4 rounded-3xl flex-center
					flex-grow-0 flex-shrink basis-12 self-center"
			>
				🚴‍♂️ Cycle Hire
			</Link>
		</nav>
	);
};

export default Sidebar;
