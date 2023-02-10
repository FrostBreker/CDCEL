//React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Styles
import './assets/styles/index.scss';

//Redux
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//Dev tools
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)),
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
