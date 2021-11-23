import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';

import { setContext } from '@apollo/client/link/context';

import { Container } from 'react-bootstrap';
import NavigationBar from './features/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Locations from './pages/locations';
import LocationPage from './pages/LocationPage';
import Error from './pages/Error';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const uploadLink = createUploadLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});
const client = new ApolloClient({
	link: authLink.concat(uploadLink, httpLink),
	cache: new InMemoryCache(),
});

const App = () => {
	const styles = {
		main: {
			backgroundColor: '#0A769D',
			backgroundImage: `linear-gradient(0deg, #F5F6F9, transparent)`,
			fontFamily: `'Passion One', cursive`,
		},
	};
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className={'min-vh-100 d-flex flex-column'} style={styles.main}>
					<NavigationBar />
					<Container className={'flex-grow-1 d-flex flex-column p-0 m-0'} fluid>
						<Switch>
							<Route path='/' exact component={Home} />
							<Route path='/profile' exact component={Profile} />
							<Route path='/locations' exact component={Locations} />
							<Route
								path='/location/:location'
								exact
								component={LocationPage}
							/>
							<Route component={Error} />
						</Switch>
					</Container>
				</div>
			</Router>
		</ApolloProvider>
	);
};

export default App;
