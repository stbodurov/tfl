import Main from './pages/Main';
import { APIContextProvider } from './context/APIContext';
import { ThemeProvider } from '@ui5/webcomponents-react';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <APIContextProvider>
        <Main />
      </APIContextProvider>
    </ThemeProvider>
  );
}

export default App;
