import { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServiceStatus from "./ServiceStatus";
import { APIContext } from "../context/APIContext";

import { BusyIndicator } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-fiori/dist/illustrations/SimpleBalloon.js";

import Bikes from "./Bikes";
import Sidebar from "../components/Sidebar";
import Home from "./Home";

const Main = () => {
	const { isLoading } = useContext(APIContext);
	const [showMenu, setShowMenu] = useState(window.innerWidth > 768);

	return isLoading ? (
		<div className="w-[100vw] h-[100vh] flex-center">
			<BusyIndicator active={true} />
		</div>
	) : (
		<Router>
			<>
				<Sidebar
					show={showMenu}
					setShow={(show: boolean | ((prevState: boolean) => boolean)) =>
						setShowMenu(show)
					}
				/>
				{!showMenu && (
					<button
						className="absolute w-12 h-12 text-xl font-bold bg-gray-200 bottom-5 left-5 flex-center active:bg-gray-300 mb- rounded-3xl hover:shadow-md"
						onClick={() => setShowMenu(true)}
					>
						&gt;
					</button>
				)}
				<main className={`main flex-center ${showMenu && "md:ml-72"}`}>
					<Routes>
						<Route path="/lines/:id" element={<ServiceStatus />} />
						<Route path="/bikes" element={<Bikes />} />
						<Route path="*" element={<Home />} />
					</Routes>
				</main>
			</>
		</Router>
	);
};

export default Main;
