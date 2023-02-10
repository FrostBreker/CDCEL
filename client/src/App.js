import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getUser} from './actions/user.actions';
import Routes from './Components/Routes';

function App(){
	const dispatch = useDispatch();
	const html = document.querySelector('html');
	html.dataset.theme = `theme-dark`;

	useEffect(
		() => {
			const fetchToken = async () => {
				dispatch(getUser());
			};
			fetchToken();
		},
		[ dispatch ],
	);
	return <Routes />;
}

export default App;
