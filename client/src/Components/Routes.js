import React, {useEffect, useState} from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import Home from '../Pages/Home';
import {useSelector} from 'react-redux';
import {isEmpty} from './utils';
import UserPage from '../Pages/UserPage';
import BookAndCDCViewer from '../Pages/BookAndCDCViewer';
import Navbar from './Navbar';

const Routes = () => {
	const userData = useSelector((state) => state.userReducer);
	const [ isLoaded, setIsLoaded ] = useState(false);

	useEffect(
		() => {
			if (!isEmpty(userData)) {
				setIsLoaded(true);
			}
		},
		[ userData ],
	);

	return (
		<Router>
			<Navbar />
			{isLoaded ? (
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/search/:isbn' component={BookAndCDCViewer} />
					<Redirect to='/' />
				</Switch>
			) : (
				<Switch>
					<Route exact path='/login' component={UserPage} />

					<Route exact path='/search/:isbn' component={BookAndCDCViewer} />
					<Redirect to='/login' />
				</Switch>
			)}
		</Router>
	);
};

export default Routes;
