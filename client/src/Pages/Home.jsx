import React, {useState} from 'react';

export default function Home(){
	const [ search, setSearch ] = useState('');
	return (
		<div className='home'>
			<header>
				<h1>Rechercher</h1>
				<input
					type='text'
					placeholder='Search'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					autoFocus={true}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							window.location.href = `/search/${search}`;
						}
					}}
				/>
			</header>
		</div>
	);
}
