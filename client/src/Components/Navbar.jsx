import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from './utils';
import cookie from 'js-cookie';

export default function Navbar(){
	const [ isLoaded, setIsLoaded ] = useState(false);
	const userData = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!isEmpty(userData)) {
				setIsLoaded(true);
			}
		},
		[ userData ],
	);

	const removeCookie = (key) => {
		if (window !== 'undefined') {
			cookie.remove(key, {expires: 1});
		}
	};

	const logout = async () => {
		await axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/user/logout`,
			withCredentials: true,
		})
			.then(() => removeCookie('jwt'))
			.catch(() => {});

		window.location = '/';
	};

	return (
		<nav className='navMenu'>
			<NavLink exact to={'/'}>
				<img
					src='https://www.zupimages.net/up/23/06/izui.png'
					width={75}
					height={75}
					alt='logo'
					style={{
						borderRadius: '50%',
					}}
				/>
			</NavLink>

			<div>
				{isLoaded ? (
					<div className='nav-profile'>
						<ul id='drop-nav'>
							<li>
								<div className='drop-trigger'>
									<p>{userData.companyName}</p>
								</div>

								<ul>
									<li onClick={logout}>
										<a className='logout-btn' href='/'>
											Se déconnecter
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				) : (
					<div />
				)}
			</div>
		</nav>
	);
}
