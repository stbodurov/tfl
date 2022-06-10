import { IllustratedMessage } from "@ui5/webcomponents-react";

const Home: React.FC = (): JSX.Element => (
	<div className="flex flex-col w-full">
		<header className="w-full h-24 p-4 pb-2 text-center bg-gray-100">
			<h2 className="text-2xl font-bold">🚌 TfL Discovery</h2>
			<h3 className="text-lg text-gray-500">Welcome</h3>
		</header>
		<IllustratedMessage
			className="mt-16"
			name="SimpleBalloon"
			titleText="Please choose a service"
			subtitleText="Select from the sidebar"
		/>
	</div>
);

export default Home;