import { UserProvider } from './use/UserContext';
import { Main } from './Main'

function App() {
	return (
		<UserProvider>
            <Main />		
		</UserProvider>
	);
}

export default App;
