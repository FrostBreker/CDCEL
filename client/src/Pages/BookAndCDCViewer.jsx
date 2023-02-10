import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {isEmpty} from '../Components/utils';
import {useSelector} from 'react-redux';

export default function BookAndCDCViewer(){
	const ISBN = window.location.pathname.split('/')[2];
	const [ book, setBook ] = useState([]);
	const [ cdc, setCDC ] = useState([]);
	const [ isLoaded, setIsLoaded ] = useState(false);
	const [ isLoadedBook, setIsLoadedBook ] = useState(false);
	const [ isLoadedCDC, setIsLoadedCDC ] = useState(false);

	const userData = useSelector((state) => state.userReducer);

	const [ postedBy, setPostedBy ] = useState('');
	const [ cdcText, setCDCText ] = useState('');

	const handlePostCDC = async (e) => {
		if (!postedBy || !cdcText) return alert('Veuillez remplir tous les champs');
		e.preventDefault();
		const data = {
			ISBN13: ISBN,
			postedBy: postedBy,
			text: cdcText,
		};

		await axios
			.post(`${process.env.REACT_APP_API_URL}api/cdc`, data, {
				withCredentials: true,
			})
			.then((res) => {
				window.location.reload();
			});
	};

	const handleDeleteCDC = async (id) => {
		await axios
			.delete(`${process.env.REACT_APP_API_URL}api/cdc/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				window.location.reload();
			});
	};

	useEffect(
		() => {
			async function fetchBook(){
				await axios
					.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`)
					.then((res) => {
						setBook(res.data);
						setIsLoadedBook(true);
					});
			}

			async function fetchCDCForThisBook(){
				await axios
					.get(`${process.env.REACT_APP_API_URL}api/cdc/${ISBN}`, {
						withCredentials: true,
					})
					.then((res) => {
						setCDC(res.data);
						setIsLoadedCDC(true);
					});
			}

			if (!isLoadedBook) {
				fetchBook();
			}

			if (!isLoadedCDC) {
				fetchCDCForThisBook();
			}

			if (!isEmpty(userData)) {
				setIsLoaded(true);
			}
		},
		[ ISBN, userData, isLoadedBook, isLoadedCDC ],
	);

	return (
		<div>
			{isLoaded ? (
				<div className='book-viewer'>
					{isLoadedBook && book.totalItems > 0 ? (
						<div className='book-card'>
							<header>
								<div className='left-side'>
									<img
										src={`https://www.base-orb.fr/visuels-pim/image/base/${ISBN}-475x500-1.jpg`}
										alt='book'
									/>
									<h3>EAN/ISBN13: {ISBN}</h3>
									<h3>
										Editeur:{' '}
										{book.items[0].volumeInfo.publisher ? (
											book.items[0].volumeInfo.publisher
										) : (
											'Inconnue'
										)}
									</h3>
									<h3>
										Pages:{' '}
										{book.items[0].volumeInfo.pageCount ? (
											book.items[0].volumeInfo.pageCount
										) : (
											'Inconnue'
										)}
									</h3>
									<h3>
										Langue:{' '}
										{book.items[0].volumeInfo.language ? (
											book.items[0].volumeInfo.language
										) : (
											'Inconnue'
										)}
									</h3>
									<h3>
										Date de publication:{' '}
										{book.items[0].volumeInfo.publishedDate}
									</h3>
									<h3>
										Categories:{' '}
										{book.items[0].volumeInfo.categories ? (
											book.items[0].volumeInfo.categories[0]
										) : (
											'Inconnue'
										)}
									</h3>
									<h3>
										Format:{' '}
										{book.items[0].volumeInfo.printType ? (
											book.items[0].volumeInfo.printType
										) : (
											'Inconnue'
										)}
									</h3>
								</div>
								<div className='right-side'>
									<h2 className='book-title'>
										Titre: {book.items[0].volumeInfo.title}
									</h2>
									<h3 className='book-author'>
										Auteur(s): {book.items[0].volumeInfo.authors.join(', ')}
									</h3>
									<p className='book-description'>
										<span>Description:&nbsp;</span>
										{book.items[0].volumeInfo.description ? (
											book.items[0].volumeInfo.description
										) : (
											"Aucune description n'est disponible pour ce livre"
										)}
									</p>
								</div>
							</header>
						</div>
					) : (
						<div className='book-card'>
							<header>
								<div className='left-side'>
									<img
										src={`https://www.base-orb.fr/visuels-pim/image/base/${ISBN}-475x500-1.jpg`}
										alt='book'
									/>
									<h3>EAN/ISBN13: {ISBN}</h3>
								</div>
							</header>
						</div>
					)}
					<h2>Vos coups de coeur sur ce livre :</h2>
					<div className='cdc-lists'>
						{isLoadedCDC &&
							cdc.map((cdc) => {
								return (
									<div className='cdc-card' key={cdc._id}>
										<p>{cdc.text}</p>

										<div className='cdc-card-footer'>
											<p>
												<span>Par: </span>
												{cdc.postedBy}
											</p>
											<p>
												<span>Le: </span>
												{new Date(cdc.createdAt).toLocaleDateString('fr-fr')}
											</p>
										</div>
										<div className='button-list'>
											{userData._id === cdc.userId && (
												<button onClick={() => handleDeleteCDC(cdc._id)}>
													Supprimer
												</button>
											)}

											<button>Télécharger</button>
										</div>
									</div>
								);
							})}
						<div className='cdc-card'>
							<div className='add-cdc'>
								<h3>Ajouter votre coup de coeur</h3>
								<input
									type='text'
									placeholder='Prénom'
									value={postedBy}
									onChange={(e) => setPostedBy(e.target.value)}
								/>
								<textarea
									placeholder='Votre coup de coeur'
									value={cdcText}
									onChange={(e) => setCDCText(e.target.value)}
								/>
								<button onClick={handlePostCDC}>Ajouter</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>Chargement</div>
			)}
		</div>
	);
}
