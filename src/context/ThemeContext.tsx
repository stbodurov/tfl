import { createContext, useState } from "react";

const ThemeContext = createContext("auto");

const ThemeContextProvider: React.FC = ({ children }: React.PropsWithChildren) => {
	const [theme, setTheme] = useState("auto");
	
	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}