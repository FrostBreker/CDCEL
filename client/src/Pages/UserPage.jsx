import React, {useState} from 'react';
import axios from 'axios';

export default function UserPage(){
	const [ isWantToLogin, setIsWantToLogin ] = useState(true);

	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ companyName, setCompanyName ] = useState('');

	async function handleLogin(){
		if (username === '' || password === '')
			return alert('Veuillez remplir tous les champs');

		await axios
			.post(
				`${process.env.REACT_APP_API_URL}api/user/signin`,
				{
					username,
					password,
				},
				{
					withCredentials: true,
				},
			)
			.then(() => {
				window.location = '/';
			});
	}

	async function handleRegister(){
		if (username === '' || password === '' || companyName === '')
			return alert('Veuillez remplir tous les champs');

		await axios
			.post(
				`${process.env.REACT_APP_API_URL}api/user/signup`,
				{
					username,
					password,
					companyName,
				},
				{
					withCredentials: true,
				},
			)
			.then(() => {
				window.location = '/';
			});
	}

	return (
		<div className='user-page'>
			{isWantToLogin ? (
				<div className='content'>
					<header>
						<h1>Se connecter</h1>
					</header>
					<body>
						<h3>Nom d'utilisateur</h3>
						<input
							type='text'
							name='username'
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
						<h3>Mot de passe</h3>
						<input
							type='password'
							name='password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<button onClick={handleLogin}>Se connecter</button>
					</body>
					<button
						className='handleRegister'
						onClick={() => {
							setIsWantToLogin(!isWantToLogin);
						}}>
						Crée un compte
					</button>
				</div>
			) : (
				<div className='content'>
					<header>
						<h1>Crée un compte</h1>
					</header>
					<body>
						<h3>Nom d'utilisateur</h3>
						<input
							type='text'
							name='username'
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
						<h3>Mot de passe</h3>
						<input
							type='password'
							name='password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<h3>Nom de l'entreprise</h3>
						<input
							type='text'
							name='company'
							value={companyName}
							onChange={(e) => {
								setCompanyName(e.target.value);
							}}
						/>
						<button onClick={handleRegister}>Crée son compte</button>
					</body>
					<button
						className='handleRegister'
						onClick={() => {
							setIsWantToLogin(!isWantToLogin);
						}}>
						Se connecter
					</button>
				</div>
			)}
		</div>
	);
}
