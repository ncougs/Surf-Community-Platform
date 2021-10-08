import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Home from './pages/Home';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Switch>
					<Route path='/' exact component={() => <Home />} />
				</Switch>
			</Router>
		</ApolloProvider>
	);
};

export default App;
